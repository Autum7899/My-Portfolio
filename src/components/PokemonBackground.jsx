import React, { useEffect, useRef } from 'react';
import { useTheme } from './useTheme';

const PokemonBackground = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    // HSL to RGB converter
    const hslToRgb = (h, s, l) => {
        s /= 100;
        l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n =>
            l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
        return [255 * f(0), 255 * f(8), 255 * f(4)];
    };

    // Sử dụng useRef cho các giá trị có thể thay đổi mà không cần render lại
    const gridOffset = useRef({ x: 0, y: 0 });
    const pokemonGrid = useRef(new Map());
    const pendingGridCells = useRef(new Set());
    const activePokemonIds = useRef(new Set());
    const totalPokemonCount = useRef(0);
    const gridDimensions = useRef({ cols: 0, rows: 0 });
    const animationFrameId = useRef(null);
    const intervalId = useRef(null);
    const currentTheme = useRef(theme);
    const lastFrameTime = useRef(0);
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    
    // Hover state management
    const hoveredPokemon = useRef(null);
    const mousePosition = useRef({ x: 0, y: 0 });
    const originalImages = useRef(new Map()); // Store original Pokemon images


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        // --- Cấu hình Lưới (Grid) ---
        const SQUARE_SIZE = 96; // Kích thước của mỗi ô vuông
        const SPEED = 0.5; // Tốc độ di chuyển của lưới

        // Thiết lập kích thước canvas và tính toán lại lưới
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.imageSmoothingEnabled = false; // Cần đặt lại sau khi resize
            gridDimensions.current.cols = Math.ceil(canvas.width / SQUARE_SIZE) + 1;
            gridDimensions.current.rows = Math.ceil(canvas.height / SQUARE_SIZE) + 1;
        };

        // Lấy tổng số lượng Pokémon từ API
        const getTotalPokemonCount = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=1');
                const data = await response.json();
                totalPokemonCount.current = data.count;
            } catch (error) {
                console.error("Không thể lấy tổng số Pokémon:", error);
                totalPokemonCount.current = 898; // Giá trị mặc định
            }
        };

        // Tải một Pokémon cho một ô cụ thể trên lưới
        const fetchPokemonForCell = async (gridX, gridY) => {
            const key = `${gridX},${gridY}`;
            if (totalPokemonCount.current === 0 || pokemonGrid.current.has(key) || pendingGridCells.current.has(key)) return;

            pendingGridCells.current.add(key);

            let randomId;
            do {
                randomId = Math.floor(Math.random() * totalPokemonCount.current) + 1;
            } while (activePokemonIds.current.has(randomId));
            
            activePokemonIds.current.add(randomId);

            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
                if (!response.ok) throw new Error('Response not OK');
                
                const data = await response.json();
                const spriteUrl = data.sprites.front_default;
                if (!spriteUrl) throw new Error('No sprite found');

                const image = new Image();
                image.crossOrigin = "Anonymous";
                image.src = spriteUrl;
                image.onload = () => {
                    // Store original image
                    originalImages.current.set(randomId, image);
                    
                    const offscreenCanvas = document.createElement('canvas');
                    const offscreenCtx = offscreenCanvas.getContext('2d');
                    offscreenCanvas.width = image.width;
                    offscreenCanvas.height = image.height;
                    offscreenCtx.drawImage(image, 0, 0);

                    const imageData = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
                    const imgData = imageData.data;

                    // Balanced subtle colors for both themes
                    const [r, g, b] = theme === 'dark' 
                        ? hslToRgb(210, 15, 45)  // More subtle light blue for dark theme
                        : hslToRgb(220, 25, 35); // Subtle dark blue for light theme

                    for (let i = 0; i < imgData.length; i += 4) {
                        if (imgData[i + 3] > 0) { // alpha > 0
                            imgData[i] = r;
                            imgData[i + 1] = g;
                            imgData[i + 2] = b;
                        }
                    }
                    offscreenCtx.putImageData(imageData, 0, 0);

                    pokemonGrid.current.set(key, { 
                        silhouette: offscreenCanvas, 
                        id: randomId,
                        originalImage: image
                    });
                    pendingGridCells.current.delete(key);
                };
                image.onerror = () => { throw new Error('Image failed to load'); };

            } catch (error) {
                activePokemonIds.current.delete(randomId);
                pendingGridCells.current.delete(key);
            }
        };

        // Clear all Pokemon data when theme changes
        const clearPokemonGrid = () => {
            pokemonGrid.current.clear();
            pendingGridCells.current.clear();
            activePokemonIds.current.clear();
            originalImages.current.clear();
        };

        // Đảm bảo các ô có thể nhìn thấy đều có Pokémon
        const populateAndCleanGrid = () => {
            const startCol = Math.floor(gridOffset.current.x / SQUARE_SIZE);
            const startRow = Math.floor(gridOffset.current.y / SQUARE_SIZE);
            
            for (let x = 0; x < gridDimensions.current.cols + 1; x++) {
                for (let y = 0; y < gridDimensions.current.rows + 1; y++) {
                    fetchPokemonForCell(startCol + x, startRow + y);
                }
            }

            const buffer = 3;
            for (const [key, pokemon] of pokemonGrid.current.entries()) {
                const [px, py] = key.split(',').map(Number);
                if (px < startCol - buffer || px > startCol + gridDimensions.current.cols + buffer ||
                    py < startRow - buffer || py > startRow + gridDimensions.current.rows + buffer) {
                    activePokemonIds.current.delete(pokemon.id);
                    pokemonGrid.current.delete(key);
                }
            }
        };

        // Optimized animation loop with frame rate limiting
        const animate = (currentTime) => {
            // Frame rate limiting for consistent 60fps
            if (currentTime - lastFrameTime.current < frameInterval) {
                animationFrameId.current = requestAnimationFrame(animate);
                return;
            }
            
            lastFrameTime.current = currentTime;
            
            gridOffset.current.x += SPEED;
            gridOffset.current.y += SPEED;

            // Use save/restore for better performance
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const startCol = Math.floor(gridOffset.current.x / SQUARE_SIZE);
            const startRow = Math.floor(gridOffset.current.y / SQUARE_SIZE);
            
            // Pre-calculate offset values to avoid repeated calculations
            const offsetX = gridOffset.current.x % SQUARE_SIZE;
            const offsetY = gridOffset.current.y % SQUARE_SIZE;
            
            // Only draw Pokemon that are visible on screen
            for (let x = 0; x < gridDimensions.current.cols + 1; x++) {
                for (let y = 0; y < gridDimensions.current.rows + 1; y++) {
                    const gridX = startCol + x;
                    const gridY = startRow + y;
                    
                    const screenX = x * SQUARE_SIZE - offsetX;
                    const screenY = y * SQUARE_SIZE - offsetY;

                    // Skip drawing if outside viewport bounds
                    if (screenX > -SQUARE_SIZE && screenX < canvas.width && 
                        screenY > -SQUARE_SIZE && screenY < canvas.height) {
                        const pokemon = pokemonGrid.current.get(`${gridX},${gridY}`);
                        if (pokemon && pokemon.silhouette) {
                            // Check if mouse is hovering over this Pokemon
                            const isHovered = hoveredPokemon.current && 
                                hoveredPokemon.current.gridX === gridX && 
                                hoveredPokemon.current.gridY === gridY;
                            
                            if (isHovered && pokemon.originalImage) {
                                // Draw original Pokemon image
                                ctx.drawImage(pokemon.originalImage, screenX, screenY, SQUARE_SIZE, SQUARE_SIZE);
                            } else {
                                // Draw colored silhouette
                                ctx.drawImage(pokemon.silhouette, screenX, screenY, SQUARE_SIZE, SQUARE_SIZE);
                            }
                        }
                    }
                }
            }
            
            ctx.restore();
            animationFrameId.current = requestAnimationFrame(animate);
        };


        // Check if theme has changed and regenerate Pokemon if needed
        if (currentTheme.current !== theme) {
            clearPokemonGrid();
            currentTheme.current = theme;
        }

        // Khởi tạo
        const init = async () => {
            resizeCanvas();
            await getTotalPokemonCount();
            populateAndCleanGrid();
            intervalId.current = setInterval(populateAndCleanGrid, 3000);
            animationFrameId.current = requestAnimationFrame(animate);
        };

        init();
        window.addEventListener('resize', resizeCanvas);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId.current);
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [theme]); // Re-run when theme changes to update Pokemon colors

    // Global mouse tracking effect
    useEffect(() => {
        const handleGlobalMouseMove = (event) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            
            const rect = canvas.getBoundingClientRect();
            mousePosition.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
            
            // Calculate which grid cell the mouse is over
            const SQUARE_SIZE = 96;
            const gridX = Math.floor((mousePosition.current.x + gridOffset.current.x) / SQUARE_SIZE);
            const gridY = Math.floor((mousePosition.current.y + gridOffset.current.y) / SQUARE_SIZE);
            
            // Check if there's a Pokemon at this grid position
            const pokemon = pokemonGrid.current.get(`${gridX},${gridY}`);
            if (pokemon) {
                hoveredPokemon.current = { gridX, gridY, pokemon };
            } else {
                hoveredPokemon.current = null;
            }
        };

        // Add global mouse listener
        document.addEventListener('mousemove', handleGlobalMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10">
            <canvas 
                ref={canvasRef} 
                className="w-full h-full opacity-25"
                style={{ 
                    opacity: 0.25,
                    pointerEvents: 'none'
                }}
            ></canvas>
        </div>
    );
};

export default PokemonBackground;
