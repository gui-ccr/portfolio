import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GRID_SIZE = 15;
const SPEED_MS = 150;

type Point = { x: number; y: number };

const getRandomFoodPosition = (snake: Point[]): Point => {
  let newFood: Point;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    // Make sure food doesn't spawn on the snake
    const isOnSnake = snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
    if (!isOnSnake) break;
  }
  return newFood;
};

export const SnakeGame: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [snake, setSnake] = useState<Point[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Point>({ x: 3, y: 3 });
  const [dir, setDir] = useState<Point>({ x: 0, y: -1 }); // UP
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  // Focus ref so we can capture keyboard events specifically in this container
  const boardRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        x: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const startGame = () => {
    setSnake([{ x: 7, y: 7 }]);
    setFood(getRandomFoodPosition([{ x: 7, y: 7 }]));
    setDir({ x: 0, y: -1 }); // Moving up initially
    setGameOver(false);
    setIsPlaying(true);
    setScore(0);
    // Focus the board to capture arrows
    if (boardRef.current) {
      boardRef.current.focus();
    }
  };

  const changeDirection = useCallback((newKey: string) => {
    if (!isPlaying || gameOver) return;
    setDir((currentDir) => {
      switch (newKey) {
        case 'UP':
          if (currentDir.y !== 1) return { x: 0, y: -1 };
          break;
        case 'DOWN':
          if (currentDir.y !== -1) return { x: 0, y: 1 };
          break;
        case 'LEFT':
          if (currentDir.x !== 1) return { x: -1, y: 0 };
          break;
        case 'RIGHT':
          if (currentDir.x !== -1) return { x: 1, y: 0 };
          break;
      }
      return currentDir;
    });
  }, [isPlaying, gameOver]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isPlaying || gameOver) return;
    
    // Prevent scrolling when playing with arrow keys
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
      e.preventDefault();
    }

    let mappedKey = '';
    if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') mappedKey = 'UP';
    if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') mappedKey = 'DOWN';
    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') mappedKey = 'LEFT';
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') mappedKey = 'RIGHT';

    if (mappedKey) changeDirection(mappedKey);
  }, [isPlaying, gameOver, changeDirection]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { x: head.x + dir.x, y: head.y + dir.y };

        // Check Wall Collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        // Check Self Collision
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check Food Collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(getRandomFoodPosition(newSnake));
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    }, SPEED_MS);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, dir, food]);

  return (
    <div 
      ref={containerRef}
      className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6"
    >
      <div className="flex justify-between items-center border-b-4 border-black pb-4">
        <h3 className="font-black text-xl md:text-2xl uppercase">SNAKE.EXE</h3>
        <p className="font-mono font-bold text-lg bg-accent-yellow px-3 py-1 border-2 border-black">
          SCORE: {score.toString().padStart(4, '0')}
        </p>
      </div>

      <div 
        ref={boardRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        // Evitando delay e previnindo comportamentos padrão no mobile
        style={{ touchAction: 'none' }}
        className="relative w-full aspect-square border-4 border-black bg-[#F3F0E0] outline-none group focus:border-[#F4DC5D] transition-colors"
      >
        {/* Render game board */}
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
          }}
        >
          {/* FOOD */}
          <div 
            className="bg-red-500 border-2 border-black"
            style={{ 
              gridColumnStart: food.x + 1, 
              gridRowStart: food.y + 1 
            }}
          />
          
          {/* SNAKE */}
          {snake.map((segment, i) => (
            <div
              key={`${segment.x}-${segment.y}-${i}`}
              className={`${i === 0 ? 'bg-green-600' : 'bg-green-800'} border- border-white`}
              style={{ 
                gridColumnStart: segment.x + 1, 
                gridRowStart: segment.y + 1 
              }}
            />
          ))}
        </div>

        {/* OVERLAYS */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <button 
              onClick={startGame}
              className="bg-accent-yellow border-4 border-black py-3 px-6 font-black uppercase text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all active:bg-yellow-300"
            >
              START_GAME()
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm gap-4">
            <h4 className="text-accent-yellow font-black text-3xl uppercase tracking-wider drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
              GAME OVER
            </h4>
            <button 
              onClick={startGame}
              className="bg-white border-4 border-black py-2 px-4 font-black uppercase text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              TRY_AGAIN()
            </button>
          </div>
        )}
      </div>

      {/* D-Pad para Dispositivos Móveis (Visível apenas em telas menores) */}
      <div className="grid grid-cols-3 gap-2 mx-auto w-32 md:hidden">
        <div />
        <button 
          onPointerDown={(e) => { e.preventDefault(); changeDirection('UP'); }}
          className="border-2 border-black bg-[#F3F0E0] active:bg-[#F4DC5D] w-10 h-10 flex items-center justify-center font-black rounded text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none select-none"
        >
          ↑
        </button>
        <div />
        <button 
          onPointerDown={(e) => { e.preventDefault(); changeDirection('LEFT'); }}
          className="border-2 border-black bg-[#F3F0E0] active:bg-[#F4DC5D] w-10 h-10 flex items-center justify-center font-black rounded text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none select-none"
        >
          ←
        </button>
        <button 
          onPointerDown={(e) => { e.preventDefault(); changeDirection('DOWN'); }}
          className="border-2 border-black bg-[#F3F0E0] active:bg-[#F4DC5D] w-10 h-10 flex items-center justify-center font-black rounded text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none select-none"
        >
          ↓
        </button>
        <button 
          onPointerDown={(e) => { e.preventDefault(); changeDirection('RIGHT'); }}
          className="border-2 border-black bg-[#F3F0E0] active:bg-[#F4DC5D] w-10 h-10 flex items-center justify-center font-black rounded text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none select-none"
        >
          →
        </button>
      </div>

      <p className="font-mono text-[10px] md:text-sm text-center font-bold px-2 whitespace-nowrap">
        USE <span className="hidden md:inline">[W,A,S,D] OU</span> OS CONTROLES PARA JOGAR
      </p>
    </div>
  );
};