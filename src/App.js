import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  Upload, Button, InputNumber, message, Card,
  Divider, Tooltip, Select, Space, Radio, Spin, Slider
} from 'antd';
import {
  UploadOutlined, DownloadOutlined, FilterOutlined,
  EditOutlined, BgColorsOutlined, UndoOutlined,
  RedoOutlined, ZoomInOutlined, ZoomOutOutlined,
  FormatPainterOutlined, EyeOutlined, SwapOutlined,
  PictureOutlined
} from '@ant-design/icons';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

const { Option } = Select;

// --- 颜色映射表 ---
const _cData = "A1:#FCF4CE|A2:#FDFDD7|A3:#FDFF93|A4:#F7ED5C|A5:#F0D73C|A6:#FDA951|A7:#FD8C50|A8:#FDD94F|A9:#F99C60|A10:#F57D36|A11:#FFDB9A|A12:#FCA27D|A13:#FFC567|A14:#F85742|A15:#FDF55F|A16:#FEFF99|A17:#FFE074|A18:#FDBD80|A19:#FE7D77|A20:#FAD66E|A21:#FAE393|A22:#EEF87A|A23:#E2C9BF|A24:#F4F4A7|A25:#FED785|A26:#FFC636|B1:#E1F13A|B2:#65F344|B3:#A1F587|B4:#60DF33|B5:#39e058|B6:#65dfa6|B7:#3fae7d|B8:#1e9b55|B9:#2c5038|B10:#9bd1ba|B11:#637133|B12:#176c3b|B13:#cae77f|B14:#abe64a|B15:#2f5033|B16:#bfeb9b|B17:#9fb240|B18:#eaf9a7|B19:#26b58e|B20:#c8eccf|B21:#19616a|B22:#0a3f40|B23:#363b1b|B24:#eaf9a7|B25:#4d816e|B26:#8e7a34|B27:#d1deae|B28:#9de4bc|B29:#c6de61|B30:#e2fbb1|B31:#b4e492|B32:#92ab5f|C1:#edffe6|C2:#abf8fe|C3:#9ee0f8|C4:#44cdfb|C5:#06abe3|C6:#54a7e9|C7:#3977cc|C8:#0f52bd|C9:#3dbbe3|C10:#3dbae3|C11:#28dfd3|C12:#1b334e|C13:#cde6fe|C14:#d9fcfc|C15:#21c6c2|C16:#1957a0|C17:#00d2f1|C18:#00d2f1|C19:#1a849d|C20:#1771a8|C21:#beddfc|C22:#6bb1bc|C23:#c8e1fa|C24:#7fc5f9|C25:#a7e8e0|C26:#41adcf|C27:#d0def9|C28:#bdcde7|C29:#39478d|D1:#adb6ec|D2:#848ed2|D3:#3354ae|D4:#142d7b|D5:#b44ec9|D6:#b47ade|D7:#8757a8|D8:#e7cffe|D9:#d5b9f4|D10:#301a48|D11:#beb7e2|D12:#d99acf|D13:#b5028c|D14:#842a94|D15:#2f1f8a|D16:#e1e3f0|D17:#c6d3fa|D18:#9b64b8|D19:#d7c2db|D20:#9b33b2|D21:#940595|D22:#3c3599|D23:#ebdaf8|D24:#7689e0|D25:#4b4fc1|D26:#d4c7e7|E1:#f6d3cc|E2:#fcc1dd|E3:#f2c0e5|E4:#e5649f|E5:#e10328|E6:#e94074|E7:#c63574|E8:#fbdbec|E9:#e575c5|E10:#d33a94|E11:#f6dad2|E12:#f594bf|E13:#b5016b|E14:#f9d4bd|E15:#f7c6cb|E16:#fbf4ec|E17:#f7e2e9|E18:#f1cbd6|E19:#f8bad1|E20:#f2bcd0|E21:#be9ca5|E22:#b789a0|E23:#927c89|E24:#debde7|F1:#fe9281|F2:#f63d4b|F3:#ed4e3c|F4:#fb2a40|F5:#e10328|F6:#913533|F7:#911932|F8:#bb0126|F9:#e1667a|F10:#854724|F11:#5a2224|F12:#ef546e|F13:#f55b45|F14:#f7adb8|F15:#d70224|F16:#f8c0a6|F17:#e59c7f|F18:#d17d48|F19:#c04448|F20:#c69496|F21:#f3b8c4|F22:#f5c3d2|F23:#e98171|F24:#de9dad|F25:#ec4455|G1:#ffe4d3|G2:#fcc6ac|G3:#f0c4a5|G4:#dcb387|G5:#e7b34e|G6:#e2a011|G7:#985c3a|G8:#713d2f|G9:#e2b685|G10:#da8c42|G11:#dbc899|G12:#ffca94|G13:#b1704a|G14:#8b664c|G15:#f6f8e3|G16:#f2d8c1|G17:#77544e|G18:#ffe3d5|G19:#dd7d41|G20:#a54430|G21:#b28460|H1:RGBA(0, 0, 0, 0)|H2:#ffffff|H3:#b3b4b4|H4:#878787|H5:#454547|H6:#2c2c2c|H7:#010001|H8:#e6d5dd|H9:#efedee|H10:#ebebeb|H11:#cdcdcd|H12:#faf4ef|H13:#f5edd1|H14:#cdd7d4|H15:#9aa6a6|H16:#1a1311|H17:#efeeef|H18:#fcfff6|H19:#f2eee5|H20:#96a09e|H21:#f8fce5|H22:#c9cbd4|H23:#9b9c94|M1:#b9c7b6|M2:#909994|M3:#677f81|M4:#dfd4b9|M5:#d1cbb0|M6:#b0a988|M7:#b1a796|M8:#ac8182|M9:#a78765|M10:#c3b2ba|M11:#9d7492|M12:#664a52|M13:#c69260|M14:#c47266|M15:#6f7b7b";
const colorMap = (_cData.split('|').reduce((a, b) => { const [k, v] = b.split(':'); a[k] = v; return a }, {}));

const hexToRgb = (hex) => {
  if (!hex || hex.toLowerCase().includes('rgba')) return { r: 255, g: 255, b: 255 };
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 255, g: 255, b: 255 };
};

const colorMapRgb = Object.entries(colorMap).reduce((acc, [key, hex]) => {
  acc[key] = hexToRgb(hex);
  return acc;
}, {});

// --- 优化1：使用 Redmean 算法替代标准欧几里得距离 ---
// 这个算法更符合人眼对色彩的感知（对绿色更敏感）
const colorDistance = (rgb1, rgb2) => {
  const rmean = (rgb1.r + rgb2.r) / 2;
  const r = rgb1.r - rgb2.r;
  const g = rgb1.g - rgb2.g;
  const b = rgb1.b - rgb2.b;
  // 核心公式：加权平方和
  return Math.sqrt((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8));
};

const findClosestColorKey = (targetRgb) => {
  let minDist = Infinity;
  let closestKey = 'H2';
  for (const [key, rgb] of Object.entries(colorMapRgb)) {
    if (key === 'H1') continue; // 跳过透明色
    const dist = colorDistance(targetRgb, rgb);
    if (dist < minDist) { minDist = dist; closestKey = key; }
  }
  return closestKey;
};

const calculateBrightness = (rgb) => (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) / 255;

const App = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [cols, setCols] = useState(50);
  const [filterThreshold, setFilterThreshold] = useState(0);
  const [loading, setLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [selectedColor, setSelectedColor] = useState('A1');
  const [currentTool, setCurrentTool] = useState('pen');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isHighlightMode, setIsHighlightMode] = useState(false);
  const canvasRef = useRef(null);
  const lastTouchDistRef = useRef(null);
  const initialZoomRef = useRef(1);

  // --- 优化2：重构图片处理逻辑 ---
  const processImage = useCallback(async () => {
    if (!imageSrc || !cols) return;
    setLoading(true); setHistory([]); setRedoStack([]);

    // 给 UI 一点时间渲染 loading 状态
    await new Promise(resolve => setTimeout(resolve, 50));

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      const { width, height } = img;
      // 计算行数，保持纵横比
      const rows = Math.round(cols / (width / height));

      const cellSize = 20;
      const leftMargin = 40; const topMargin = 40;

      // 创建一个微型 Canvas，尺寸正好是 cols * rows
      // 利用浏览器内置的高质量缩放算法（双三次插值）来自动处理像素平均
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = cols;
      tempCanvas.height = rows;
      const tempCtx = tempCanvas.getContext('2d');

      // 开启高质量平滑
      tempCtx.imageSmoothingEnabled = true;
      tempCtx.imageSmoothingQuality = 'high';

      // 先填充白色背景，防止透明图片处理出错
      tempCtx.fillStyle = '#FFFFFF';
      tempCtx.fillRect(0, 0, cols, rows);
      tempCtx.drawImage(img, 0, 0, cols, rows);

      // 直接获取缩放后的像素数据
      const imageData = tempCtx.getImageData(0, 0, cols, rows).data;

      const pixelData = [];
      const colorCount = {};

      // 遍历缩放后的每个像素
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = (row * cols + col) * 4;
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          // alpha = imageData[i + 3] - 这里我们忽略透明度，因为已经垫了白底

          const targetRgb = { r, g, b };
          const closestKey = findClosestColorKey(targetRgb);

          colorCount[closestKey] = (colorCount[closestKey] || 0) + 1;
          pixelData.push({ row, col, colorKey: closestKey });
        }
      }

      setData({
        pixelData, colorCount, totalPixels: rows * cols,
        canvasConfig: { rows, cols, cellSize, leftMargin, topMargin, width: leftMargin + cols * cellSize + 20, height: topMargin + rows * cellSize + 40 }
      });

      // 移动端自动调整缩放比例
      const canvasWidth = leftMargin + cols * cellSize + 20;
      const screenWidth = window.innerWidth - 20;
      if (screenWidth < 768 && canvasWidth > screenWidth) {
        setZoomLevel(Math.max(0.3, screenWidth / canvasWidth));
      }

      setLoading(false);
    };
  }, [imageSrc, cols]);

  useEffect(() => { processImage(); }, [processImage]);

  // 画布绘制 (保持不变)
  useEffect(() => {
    if (!data || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { rows, cols: colCount, cellSize, leftMargin, topMargin, width, height } = data.canvasConfig;

    canvas.width = width; canvas.height = height;
    ctx.fillStyle = '#f0f0f0'; ctx.fillRect(0, 0, width, height);

    ctx.font = 'bold 12px Arial'; ctx.fillStyle = '#666'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let r = 0; r < rows; r++) ctx.fillText(r + 1, leftMargin - 20, topMargin + r * cellSize + cellSize / 2);
    for (let c = 0; c < colCount; c++) ctx.fillText(c + 1, leftMargin + c * cellSize + cellSize / 2, topMargin + rows * cellSize + 20);

    data.pixelData.forEach(p => {
      const isDimmed = isHighlightMode && p.colorKey !== selectedColor;
      const isHighlighted = isHighlightMode && p.colorKey === selectedColor;
      const colorHex = colorMap[p.colorKey];
      const x = leftMargin + p.col * cellSize;
      const y = topMargin + p.row * cellSize;

      ctx.save();
      ctx.globalAlpha = isDimmed ? 0.15 : 1.0;
      ctx.fillStyle = colorHex;
      ctx.fillRect(x, y, cellSize, cellSize);

      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, y, cellSize, cellSize);

      if (isHighlighted) {
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(x, y, cellSize, cellSize);
      }

      if (!isDimmed) {
        ctx.fillStyle = calculateBrightness(colorMapRgb[p.colorKey]) > 0.5 ? '#000' : '#fff';
        ctx.font = 'bold 9px Arial';
        ctx.fillText(p.colorKey, x + cellSize / 2, y + cellSize / 2);
      }
      ctx.restore();
    });

    // 黑色加粗网格线
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;

    for (let c = 5; c < colCount; c += 5) {
      const x = leftMargin + c * cellSize;
      ctx.moveTo(x, topMargin);
      ctx.lineTo(x, topMargin + rows * cellSize);
    }
    for (let r = 5; r < rows; r += 5) {
      const y = topMargin + r * cellSize;
      ctx.moveTo(leftMargin, y);
      ctx.lineTo(leftMargin + colCount * cellSize, y);
    }
    ctx.stroke();

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(leftMargin, topMargin, colCount * cellSize, rows * cellSize);
    ctx.restore();

  }, [data, isHighlightMode, selectedColor]);

  const saveHistory = () => { if (data) { setHistory(p => [...p.slice(-19), JSON.parse(JSON.stringify(data))]); setRedoStack([]); } };
  const handleUndo = () => { if (history.length) { setRedoStack(p => [data, ...p]); setData(history[history.length - 1]); setHistory(p => p.slice(0, -1)); } };
  const handleRedo = () => { if (redoStack.length) { setHistory(p => [...p, data]); setData(redoStack[0]); setRedoStack(p => p.slice(1)); } };

  // 双指缩放处理
  const getTouchDistance = (touches) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // 双指按下，记录初始距离和缩放
      lastTouchDistRef.current = getTouchDistance(e.touches);
      initialZoomRef.current = zoomLevel;
      e.preventDefault();
    } else if (e.touches.length === 1) {
      // 单指按下，开始绘制
      const touch = e.touches[0];
      handleCanvasAction(touch, true);
      setIsDrawing(true);
      e.preventDefault();
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      // 双指移动，进行缩放
      const currentDist = getTouchDistance(e.touches);
      if (lastTouchDistRef.current && lastTouchDistRef.current > 0) {
        const scale = currentDist / lastTouchDistRef.current;
        const newZoom = Math.max(0.3, Math.min(2, initialZoomRef.current * scale));
        setZoomLevel(newZoom);
      }
      e.preventDefault();
    } else if (e.touches.length === 1 && isDrawing) {
      // 单指移动，进行绘制
      const touch = e.touches[0];
      handleCanvasAction(touch, false);
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      lastTouchDistRef.current = null;
    }
    if (e.touches.length === 0) {
      setIsDrawing(false);
    }
  };

  const handleCanvasAction = (e, isClick) => {
    if (!data || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    // 兼容鼠标和触摸事件
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    const { leftMargin, topMargin, cellSize, rows, cols } = data.canvasConfig;

    if (x < leftMargin || y < topMargin) return;
    const col = Math.floor((x - leftMargin) / cellSize);
    const row = Math.floor((y - topMargin) / cellSize);
    if (col < 0 || col >= cols || row < 0 || row >= rows) return;

    const idx = data.pixelData.findIndex(p => p.row === row && p.col === col);
    if (idx === -1) return;
    const pixel = data.pixelData[idx];

    if (isHighlightMode && isClick) {
      setSelectedColor(pixel.colorKey);
      return;
    }

    if (currentTool === 'dropper' && isClick) { setSelectedColor(pixel.colorKey); setCurrentTool('pen'); message.success(`已吸取 ${pixel.colorKey}`); return; }
    if (isClick) saveHistory();

    if (currentTool === 'bucket' && isClick) {
      if (pixel.colorKey === selectedColor) return;
      const stack = [[row, col]]; const visited = new Set();
      const newPixels = [...data.pixelData];
      const pMap = new Map(); newPixels.forEach((p, i) => pMap.set(`${p.row},${p.col}`, i));

      while (stack.length) {
        const [r, c] = stack.pop(); const k = `${r},${c}`;
        if (visited.has(k)) continue;
        const i = pMap.get(k); if (i === undefined) continue;
        if (newPixels[i].colorKey === pixel.colorKey) {
          newPixels[i] = { ...newPixels[i], colorKey: selectedColor }; visited.add(k);
          if (r > 0) stack.push([r - 1, c]); if (r < rows - 1) stack.push([r + 1, c]);
          if (c > 0) stack.push([r, c - 1]); if (c < cols - 1) stack.push([r, c + 1]);
        }
      }
      updateData(newPixels);
    } else if (currentTool === 'pen' && pixel.colorKey !== selectedColor) {
      const newPixels = [...data.pixelData]; newPixels[idx] = { ...pixel, colorKey: selectedColor };
      updateData(newPixels);
    }
  };

  const updateData = (pixels) => {
    const counts = {}; pixels.forEach(p => counts[p.colorKey] = (counts[p.colorKey] || 0) + 1);
    setData(p => ({ ...p, pixelData: pixels, colorCount: counts }));
  };

  const filterColors = () => {
    if (!data) return; saveHistory();
    const limit = data.totalPixels * (filterThreshold / 100);
    const keep = Object.keys(data.colorCount).filter(k => data.colorCount[k] >= limit);
    if (keep.length === Object.keys(data.colorCount).length) return message.info("无需优化");
    const map = {};
    Object.keys(data.colorCount).forEach(k => {
      if (keep.includes(k)) return;
      let min = Infinity, best = keep[0] || 'H2';
      keep.forEach(tk => { const d = colorDistance(colorMapRgb[k], colorMapRgb[tk]); if (d < min) { min = d; best = tk; } });
      map[k] = best;
    });
    const newP = data.pixelData.map(p => ({ ...p, colorKey: map[p.colorKey] || p.colorKey }));
    updateData(newP); message.success("优化完成");
  };

  const handleMirror = () => {
    if (!data) return;
    saveHistory();
    const { cols } = data.canvasConfig;
    const newPixelData = data.pixelData.map(p => ({
      ...p,
      col: cols - 1 - p.col
    }));
    setData(prev => ({ ...prev, pixelData: newPixelData }));
    message.success('已水平翻转');
  };

  const saveImage = () => {
    if (!canvasRef.current || !data) return;
    const wasHighlighting = isHighlightMode;
    if (wasHighlighting) setIsHighlightMode(false);

    if (wasHighlighting) {
      message.warning("导出时已自动关闭高亮模式");
      setTimeout(() => setIsHighlightMode(true), 1000);
    }

    const main = canvasRef.current;
    const padding = 20;

    const sortedEntries = Object.entries(data.colorCount).sort((a, b) => b[1] - a[1]);
    const cardWidth = 42;
    const cardHeight = 70;
    const gap = 10;
    const availableWidth = main.width;
    const itemsPerRow = Math.floor(availableWidth / (cardWidth + gap));
    const totalRows = Math.ceil(sortedEntries.length / itemsPerRow);
    const statsHeight = totalRows * (cardHeight + gap) + 60;

    const cvs = document.createElement('canvas');
    cvs.width = main.width + padding * 2;
    cvs.height = main.height + statsHeight + padding * 2;
    const ctx = cvs.getContext('2d');

    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cvs.width, cvs.height);

    ctx.drawImage(main, padding, padding);

    ctx.save();
    ctx.translate(padding, padding);
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    const { rows, cols: colCount, cellSize, leftMargin, topMargin } = data.canvasConfig;
    for (let c = 5; c < colCount; c += 5) {
      const lx = leftMargin + c * cellSize;
      ctx.moveTo(lx, topMargin);
      ctx.lineTo(lx, topMargin + rows * cellSize);
    }
    for (let r = 5; r < rows; r += 5) {
      const ly = topMargin + r * cellSize;
      ctx.moveTo(leftMargin, ly);
      ctx.lineTo(leftMargin + colCount * cellSize, ly);
    }
    ctx.stroke();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(leftMargin, topMargin, colCount * cellSize, rows * cellSize);
    ctx.restore();

    ctx.save();
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.rotate(-Math.PI / 6);

    const watermarkText = "aguaฅ՞•ﻌ•՞ฅagua";
    const textMetrics = ctx.measureText(watermarkText);
    const textWidth = textMetrics.width;
    const textHeight = 100;

    for (let y = -cvs.height; y < cvs.height * 2; y += textHeight) {
      for (let x = -cvs.width; x < cvs.width * 2; x += textWidth + 100) {
        ctx.fillText(watermarkText, x, y);
      }
    }
    ctx.restore();

    const statsStartY = main.height + padding + 40;
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('色号统计ฅ՞•ﻌ•՞ฅ:', padding, statsStartY);

    let currentX = padding;
    let currentY = statsStartY + 25;

    sortedEntries.forEach(([k, c]) => {
      const percentage = ((c / data.totalPixels) * 100).toFixed(1) + '%';
      if (currentX + cardWidth > cvs.width - padding) {
        currentX = padding;
        currentY += cardHeight + gap;
      }

      ctx.fillStyle = '#fff';
      ctx.fillRect(currentX, currentY, cardWidth, cardHeight);
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1;
      ctx.strokeRect(currentX, currentY, cardWidth, cardHeight);

      const colorHalfHeight = 26;
      ctx.fillStyle = colorMap[k];
      ctx.fillRect(currentX, currentY, cardWidth, colorHalfHeight);
      ctx.beginPath();
      ctx.moveTo(currentX, currentY + colorHalfHeight);
      ctx.lineTo(currentX + cardWidth, currentY + colorHalfHeight);
      ctx.strokeStyle = '#eee';
      ctx.stroke();

      const textCenterY = currentY + colorHalfHeight + (cardHeight - colorHalfHeight) / 2;
      const textCenterX = currentX + cardWidth / 2;

      ctx.fillStyle = '#333';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(k, textCenterX, textCenterY);

      ctx.fillStyle = '#666';
      ctx.font = '10px Arial';
      ctx.textBaseline = 'top';
      ctx.fillText(`×${c}`, textCenterX, textCenterY);

      ctx.fillStyle = '#999';
      ctx.font = '9px Arial';
      ctx.fillText(percentage, textCenterX, textCenterY + 13);

      currentX += cardWidth + gap;
    });

    cvs.toBlob(b => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'pixel-art.png'; a.click(); });
  };

  const sortedKeys = useMemo(() => Object.keys(colorMap).sort((a, b) => {
    const ma = a.match(/^([A-Z]+)(\d+)$/), mb = b.match(/^([A-Z]+)(\d+)$/);
    if (ma && mb) return ma[1] === mb[1] ? parseInt(ma[2]) - parseInt(mb[2]) : ma[1].localeCompare(mb[1]);
    return a.localeCompare(b);
  }), []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f0f2f5', padding: 0 }}>
      <Card
        title={<span><FormatPainterOutlined />拼豆图纸生成器</span>}
        className="pixel-editor"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px', overflow: 'hidden' }}
      >
        <div style={{ flex: '0 0 auto' }}>
          <Space wrap className="control-panel" style={{ width: '100%', gap: 4 }}>
            <Upload accept="image/*" beforeUpload={f => { const r = new FileReader(); r.onload = e => setImageSrc(e.target.result); r.readAsDataURL(f); return false; }} showUploadList={false}>
              <Button type="primary" icon={<UploadOutlined />} size="small">上传</Button>
            </Upload>
            <InputNumber addonBefore="宽" min={10} max={200} value={cols} onChange={setCols} size="small" />
            <InputNumber addonBefore="过滤" min={0} max={20} value={filterThreshold} onChange={setFilterThreshold} size="small" />
            <Button icon={<FilterOutlined />} onClick={filterColors} disabled={!data} size="small">优化</Button>
            <Button icon={<SwapOutlined />} onClick={handleMirror} disabled={!data} size="small">镜像</Button>
            <Button type="primary" ghost icon={<DownloadOutlined />} onClick={saveImage} disabled={!data} size="small">导出</Button>
          </Space>

          <Divider style={{ margin: '6px 0' }} />

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
            <Space wrap size={2}>
              <Radio.Group value={currentTool} onChange={e => setCurrentTool(e.target.value)} buttonStyle="solid" size="small">
                <Radio.Button value="pen"><EditOutlined /> 画笔</Radio.Button>
                <Radio.Button value="bucket"><BgColorsOutlined /> 填充</Radio.Button>
                <Radio.Button value="dropper"><FormatPainterOutlined /> 吸管</Radio.Button>
              </Radio.Group>

              <Button
                type={isHighlightMode ? "primary" : "default"}
                icon={<EyeOutlined />}
                onClick={() => setIsHighlightMode(!isHighlightMode)}
                danger={isHighlightMode}
                size="small"
              >
                {isHighlightMode ? "定位中" : "定位"}
              </Button>

              <Button icon={<UndoOutlined />} onClick={handleUndo} disabled={!history.length} size="small" />
              <Button icon={<RedoOutlined />} onClick={handleRedo} disabled={!redoStack.length} size="small" />
            </Space>

            <Space size={2} align="center">
              <ZoomOutOutlined style={{ fontSize: 12, cursor: 'pointer' }} onClick={() => setZoomLevel(z => Math.max(0.3, z - 0.1))} />
              <Slider min={0.3} max={2} step={0.1} value={zoomLevel} onChange={setZoomLevel} style={{ width: 60 }} />
              <ZoomInOutlined style={{ fontSize: 12, cursor: 'pointer' }} onClick={() => setZoomLevel(z => Math.min(2, z + 0.1))} />

              <div style={{ width: 20, height: 20, background: colorMap[selectedColor], border: '1px solid #ddd', borderRadius: 2 }} />
              <Select showSearch value={selectedColor} onChange={setSelectedColor} style={{ width: 80 }} size="small" filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}>
                {sortedKeys.map(k => <Option key={k} value={k} label={k}><Space><div style={{ width: 10, height: 10, background: colorMap[k] }} />{k}</Space></Option>)}
              </Select>
            </Space>
          </div>
        </div>

        <div className={imageSrc ? "canvas-container" : "canvas-container noData"}
          style={{ flex: 1, minHeight: 200, overflow: 'auto', display: 'flex', position: 'relative', border: '1px solid #f0f0f0', background: '#888' }}>
          <Spin spinning={loading} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {data ? (
              <div style={{ margin: 'auto' }}>
                <canvas
                  ref={canvasRef}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top left',
                    transition: 'transform 0.1s',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    display: 'block',
                    touchAction: 'none'
                  }}
                  onMouseDown={e => { setIsDrawing(true); handleCanvasAction(e, true); }}
                  onMouseMove={e => isDrawing && handleCanvasAction(e, false)}
                  onMouseUp={() => setIsDrawing(false)}
                  onMouseLeave={() => setIsDrawing(false)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                />
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.8)',
                gap: 12,
                margin: 'auto'
              }}>
                <PictureOutlined style={{ fontSize: 64, opacity: 0.5 }} />
                <span style={{ fontSize: 16 }}>暂无图纸</span>
                <span style={{ fontSize: 12, opacity: 0.6 }}>请点击左上角上传图片生成</span>
              </div>
            )}
          </Spin>
        </div>

        {data && <div className="color-palette-area" style={{ flex: '0 0 auto', marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4, maxHeight: 150, overflowY: 'auto', paddingRight: 4 }}>
          {Object.entries(data.colorCount).sort((a, b) => b[1] - a[1]).map(([k, c]) => {
            const percentage = ((c / data.totalPixels) * 100).toFixed(1);
            return (
              <Tooltip key={k} title={`${k}: ${c}颗 (${percentage}%) - 点击定位`}>
                <div
                  onClick={() => {
                    setSelectedColor(k);
                    setIsHighlightMode(true);
                  }}
                  className="color-palette-item"
                  style={{
                    width: 42, height: 75,
                    border: selectedColor === k ? '2px solid #1890ff' : '1px solid #ddd',
                    borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: 'column',
                    cursor: 'pointer', background: '#fff',
                    opacity: (isHighlightMode && selectedColor !== k) ? 0.3 : 1,
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ flex: 1, background: colorMap[k], width: '100%' }} />
                  <div style={{ height: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 9, background: '#fff', borderTop: '1px solid #eee' }}>
                    <span style={{ fontWeight: 'bold', color: '#333', fontSize: 11 }}>{k}</span>
                    <span style={{ color: '#666', fontSize: 10, fontWeight: 500 }}>×{c}</span>
                    <span style={{ color: '#999', fontSize: 9, marginTop: 2 }}>{percentage}%</span>
                  </div>
                </div>
              </Tooltip>
            );
          })}
        </div>}
      </Card>
      {/* 悬浮版权标 (Fixed Badge) - 移动端隐藏 */}
      <div className="copyright-badge" style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        zIndex: 9999,
        padding: '6px 12px',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(4px)',
        borderRadius: '6px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        fontSize: '12px',
        color: '#666',
        textAlign: 'right',
        pointerEvents: 'auto',
      }}>
        <div>
          Made with ❤️ by
          <span style={{ color: '#ff4d4f', fontWeight: 'bold', margin: '0 4px' }}>
            xhs：士多啤梨(拼豆发疯版)
          </span>
        </div>
        <div style={{ transform: 'scale(0.9)', transformOrigin: 'right center', opacity: 0.8 }}>
          xhs号：95410734438
        </div>
      </div>
      <Analytics />
    </div>
  );
};

export default App; 