import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  Upload, Button, InputNumber, message, Card,
  Divider, Tooltip, Select, Space, Radio, Spin, Slider, Modal, Dropdown
} from 'antd';
import {
  UploadOutlined, DownloadOutlined, FilterOutlined,
  EditOutlined, BgColorsOutlined, UndoOutlined,
  RedoOutlined, ZoomInOutlined, ZoomOutOutlined,
  FormatPainterOutlined, EyeOutlined, SwapOutlined,
  PictureOutlined, RetweetOutlined, SwapRightOutlined,
  DragOutlined, CopyOutlined, SnippetsOutlined,
  LeftOutlined, QuestionCircleOutlined,
  ArrowUpOutlined, ArrowDownOutlined,
  ArrowLeftOutlined, ArrowRightOutlined,
  CaretDownOutlined
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
  acc[key] = hexToRgb(hex); return acc;
}, {});

const colorDistance = (rgb1, rgb2) => {
  const rmean = (rgb1.r + rgb2.r) / 2; const r = rgb1.r - rgb2.r; const g = rgb1.g - rgb2.g; const b = rgb1.b - rgb2.b;
  return Math.sqrt((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8));
};

const findClosestColorKey = (targetRgb) => {
  let minDist = Infinity; let closestKey = 'H2';
  for (const [key, rgb] of Object.entries(colorMapRgb)) {
    if (key === 'H1') continue;
    const dist = colorDistance(targetRgb, rgb);
    if (dist < minDist) { minDist = dist; closestKey = key; }
  }
  return closestKey;
};

// 查找最相似色号（排除指定的色号列表）
const findClosestColorKeyExclude = (targetRgb, excludeKeys = []) => {
  let minDist = Infinity; let closestKey = null;
  for (const [key, rgb] of Object.entries(colorMapRgb)) {
    if (key === 'H1' || excludeKeys.includes(key)) continue;
    const dist = colorDistance(targetRgb, rgb);
    if (dist < minDist) { minDist = dist; closestKey = key; }
  }
  return closestKey;
};

const calculateBrightness = (rgb) => (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) / 255;


// === 独立的画布组件 ===
const CanvasPanel = ({
  panelId,
  isStandalone,
  onEnableAdvanced,
  globalTool, setGlobalTool,
  globalSelectedColor, setGlobalSelectedColor,
  isHighlightMode, setIsHighlightMode,
  clipboard, setClipboard,
  sortedKeys
}) => {
  const [imageSrc, setImageSrc] = useState('');
  const [cols, setCols] = useState(isStandalone ? 50 : 40);
  const [filterThreshold, setFilterThreshold] = useState(0);
  const [loading, setLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const [isReplaceModalVisible, setIsReplaceModalVisible] = useState(false);
  const [replaceSourceColor, setReplaceSourceColor] = useState('');
  const [replaceTargetColor, setReplaceTargetColor] = useState('A1');

  const [isSimilarModalVisible, setIsSimilarModalVisible] = useState(false);
  const [missingColors, setMissingColors] = useState([]);

  const [selectionBounds, setSelectionBounds] = useState(null);
  const [floatingPixels, setFloatingPixels] = useState(null);
  const [selectionState, setSelectionState] = useState('none');
  const [dragStart, setDragStart] = useState(null);

  const canvasRef = useRef(null);
  const lastTouchDistRef = useRef(null);
  const initialZoomRef = useRef(1);
  const latestDataRef = useRef(data);
  const latestFloatingRef = useRef(floatingPixels);

  useEffect(() => { latestDataRef.current = data; }, [data]);
  useEffect(() => { latestFloatingRef.current = floatingPixels; }, [floatingPixels]);

  const updateData = useCallback((pixels) => {
    const counts = {}; pixels.forEach(p => counts[p.colorKey] = (counts[p.colorKey] || 0) + 1);
    setData(p => ({ ...p, pixelData: pixels, colorCount: counts }));
  }, []);

  const saveHistory = useCallback(() => {
    if (data) { setHistory(p => [...p.slice(-19), JSON.parse(JSON.stringify(data))]); setRedoStack([]); }
  }, [data]);

  const commitFloatingPixelsSafe = useCallback(() => {
    const currData = latestDataRef.current; const currFloat = latestFloatingRef.current;
    if (!currData || !currFloat) return;
    const newPixelData = [...currData.pixelData];
    currFloat.pixels.forEach(fp => {
      const targetRow = fp.row + currFloat.dr; const targetCol = fp.col + currFloat.dc;
      if (targetRow >= 0 && targetRow < currData.canvasConfig.rows && targetCol >= 0 && targetCol < currData.canvasConfig.cols) {
        const idx = newPixelData.findIndex(p => p.row === targetRow && p.col === targetCol);
        if (idx !== -1) newPixelData[idx] = { ...newPixelData[idx], colorKey: fp.colorKey };
      }
    });
    updateData(newPixelData); setFloatingPixels(null);
  }, [updateData]);

  useEffect(() => {
    if (globalTool !== 'select' || isStandalone) {
      commitFloatingPixelsSafe(); setSelectionBounds(null); setSelectionState('none');
    }
  }, [globalTool, isStandalone, commitFloatingPixelsSafe]);

  const processImage = useCallback(async () => {
    if (!imageSrc || !cols) return;
    setLoading(true); setHistory([]); setRedoStack([]);
    commitFloatingPixelsSafe(); setSelectionBounds(null); setSelectionState('none');

    await new Promise(resolve => setTimeout(resolve, 50));
    const img = new Image(); img.crossOrigin = 'anonymous'; img.src = imageSrc;
    img.onload = () => {
      const { width, height } = img; const rows = Math.round(cols / (width / height));
      const cellSize = 20; const leftMargin = 40; const topMargin = 40;

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = cols; tempCanvas.height = rows; const tempCtx = tempCanvas.getContext('2d');
      tempCtx.imageSmoothingEnabled = true; tempCtx.imageSmoothingQuality = 'high';
      tempCtx.fillStyle = '#FFFFFF'; tempCtx.fillRect(0, 0, cols, rows); tempCtx.drawImage(img, 0, 0, cols, rows);

      const imageData = tempCtx.getImageData(0, 0, cols, rows).data;
      const pixelData = []; const colorCount = {};

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = (row * cols + col) * 4;
          const targetRgb = { r: imageData[i], g: imageData[i + 1], b: imageData[i + 2] };
          const closestKey = findClosestColorKey(targetRgb);
          colorCount[closestKey] = (colorCount[closestKey] || 0) + 1;
          pixelData.push({ row, col, colorKey: closestKey });
        }
      }

      setData({
        pixelData, colorCount, totalPixels: rows * cols,
        canvasConfig: { rows, cols, cellSize, leftMargin, topMargin, width: leftMargin + cols * cellSize + 20, height: topMargin + rows * cellSize + 40 }
      });

      if (isStandalone) {
        const canvasWidth = leftMargin + cols * cellSize + 20;
        const screenWidth = window.innerWidth - 20;
        if (screenWidth < 768 && canvasWidth > screenWidth) setZoomLevel(Math.max(0.3, screenWidth / canvasWidth));
        else setZoomLevel(1);
      } else { setZoomLevel(1); }

      setLoading(false);
    };
  }, [imageSrc, cols, isStandalone, commitFloatingPixelsSafe]);

  useEffect(() => { processImage(); }, [processImage]);

  useEffect(() => {
    if (!data || !canvasRef.current) return;
    const canvas = canvasRef.current; const ctx = canvas.getContext('2d');
    const { rows, cols: colCount, cellSize, leftMargin, topMargin, width, height } = data.canvasConfig;

    canvas.width = width; canvas.height = height;
    ctx.fillStyle = '#f0f0f0'; ctx.fillRect(0, 0, width, height);
    ctx.font = 'bold 12px Arial'; ctx.fillStyle = '#666'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

    for (let r = 0; r < rows; r++) ctx.fillText(r + 1, leftMargin - 20, topMargin + r * cellSize + cellSize / 2);
    for (let c = 0; c < colCount; c++) ctx.fillText(c + 1, leftMargin + c * cellSize + cellSize / 2, topMargin + rows * cellSize + 20);

    data.pixelData.forEach(p => {
      const isDimmed = isHighlightMode && p.colorKey !== globalSelectedColor;
      const isHighlighted = isHighlightMode && p.colorKey === globalSelectedColor;
      const colorHex = colorMap[p.colorKey];
      const x = leftMargin + p.col * cellSize; const y = topMargin + p.row * cellSize;

      ctx.save();
      ctx.globalAlpha = isDimmed ? 0.15 : 1.0;
      ctx.fillStyle = colorHex; ctx.fillRect(x, y, cellSize, cellSize);
      ctx.globalAlpha = 1.0; ctx.strokeStyle = '#e0e0e0'; ctx.lineWidth = 0.5; ctx.strokeRect(x, y, cellSize, cellSize);

      if (isHighlighted) { ctx.strokeStyle = '#ff0000'; ctx.lineWidth = 2.5; ctx.strokeRect(x, y, cellSize, cellSize); }
      if (!isDimmed && p.colorKey !== 'H1') {
        ctx.fillStyle = calculateBrightness(colorMapRgb[p.colorKey]) > 0.5 ? '#000' : '#fff';
        ctx.font = 'bold 9px Arial'; ctx.fillText(p.colorKey, x + cellSize / 2, y + cellSize / 2);
      }
      ctx.restore();
    });

    if (floatingPixels && !isStandalone) {
      floatingPixels.pixels.forEach(p => {
        const targetRow = p.row + floatingPixels.dr; const targetCol = p.col + floatingPixels.dc;
        if (targetRow < 0 || targetRow >= rows || targetCol < 0 || targetCol >= colCount) return;

        const isDimmed = isHighlightMode && p.colorKey !== globalSelectedColor;
        const x = leftMargin + targetCol * cellSize; const y = topMargin + targetRow * cellSize;

        ctx.save();
        ctx.globalAlpha = isDimmed ? 0.15 : 1.0;
        ctx.fillStyle = colorMap[p.colorKey]; ctx.fillRect(x, y, cellSize, cellSize);
        ctx.globalAlpha = 1.0; ctx.strokeStyle = '#666'; ctx.lineWidth = 1; ctx.strokeRect(x, y, cellSize, cellSize);
        if (!isDimmed && p.colorKey !== 'H1') {
          ctx.fillStyle = calculateBrightness(colorMapRgb[p.colorKey]) > 0.5 ? '#000' : '#fff';
          ctx.font = 'bold 9px Arial'; ctx.fillText(p.colorKey, x + cellSize / 2, y + cellSize / 2);
        }
        ctx.restore();
      });
    }

    ctx.save(); ctx.beginPath(); ctx.strokeStyle = '#000000'; ctx.lineWidth = 1.5;
    for (let c = 5; c < colCount; c += 5) { const x = leftMargin + c * cellSize; ctx.moveTo(x, topMargin); ctx.lineTo(x, topMargin + rows * cellSize); }
    for (let r = 5; r < rows; r += 5) { const y = topMargin + r * cellSize; ctx.moveTo(leftMargin, y); ctx.lineTo(leftMargin + colCount * cellSize, y); }
    ctx.stroke(); ctx.strokeStyle = '#000000'; ctx.lineWidth = 1; ctx.strokeRect(leftMargin, topMargin, colCount * cellSize, rows * cellSize);
    ctx.restore();

    if (selectionBounds && !isStandalone) {
      const minR = Math.min(selectionBounds.r1, selectionBounds.r2); const maxR = Math.max(selectionBounds.r1, selectionBounds.r2);
      const minC = Math.min(selectionBounds.c1, selectionBounds.c2); const maxC = Math.max(selectionBounds.c1, selectionBounds.c2);
      const x = leftMargin + minC * cellSize; const y = topMargin + minR * cellSize;
      const w = (maxC - minC + 1) * cellSize; const h = (maxR - minR + 1) * cellSize;

      ctx.save(); ctx.setLineDash([6, 6]); ctx.strokeStyle = '#1890ff'; ctx.lineWidth = 2.5; ctx.strokeRect(x, y, w, h);
      ctx.setLineDash([6, 6]); ctx.lineDashOffset = 6; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.5; ctx.strokeRect(x, y, w, h);
      ctx.restore();
    }
  }, [data, isHighlightMode, globalSelectedColor, selectionBounds, floatingPixels, isStandalone]);

  const getCanvasCoords = (e) => {
    if (!data || !canvasRef.current) return null;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width; const scaleY = canvasRef.current.height / rect.height;
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0; const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    const x = (clientX - rect.left) * scaleX; const y = (clientY - rect.top) * scaleY;
    const { leftMargin, topMargin, cellSize, rows, cols } = data.canvasConfig;

    if (x < leftMargin || y < topMargin) return null;
    const col = Math.floor((x - leftMargin) / cellSize); const row = Math.floor((y - topMargin) / cellSize);
    if (col < 0 || col >= cols || row < 0 || row >= rows) return null;
    return { row, col };
  };

  const handleMouseDown = (e) => {
    const coords = getCanvasCoords(e); if (!coords) return;
    const { row, col } = coords;

    if (globalTool === 'select' && !isStandalone) {
      const minR = selectionBounds ? Math.min(selectionBounds.r1, selectionBounds.r2) : -1;
      const maxR = selectionBounds ? Math.max(selectionBounds.r1, selectionBounds.r2) : -1;
      const minC = selectionBounds ? Math.min(selectionBounds.c1, selectionBounds.c2) : -1;
      const maxC = selectionBounds ? Math.max(selectionBounds.c1, selectionBounds.c2) : -1;

      const isInside = selectionBounds && row >= minR && row <= maxR && col >= minC && col <= maxC;

      if (isInside) {
        setSelectionState('dragging'); setDragStart({ row, col });
        if (!floatingPixels) {
          saveHistory();
          const newPixelData = [...data.pixelData]; const floating = [];
          for (let r = minR; r <= maxR; r++) {
            for (let c = minC; c <= maxC; c++) {
              const idx = newPixelData.findIndex(p => p.row === r && p.col === c);
              if (idx !== -1) {
                floating.push({ ...newPixelData[idx] });
                newPixelData[idx] = { ...newPixelData[idx], colorKey: 'H2' };
              }
            }
          }
          updateData(newPixelData); setFloatingPixels({ pixels: floating, dr: 0, dc: 0 });
        }
      } else {
        if (floatingPixels) commitFloatingPixelsSafe();
        setSelectionState('selecting'); setSelectionBounds({ r1: row, c1: col, r2: row, c2: col }); setDragStart({ row, col });
      }
    } else {
      if (floatingPixels && !isStandalone) commitFloatingPixelsSafe();
      setSelectionBounds(null); setSelectionState('none');
      setIsDrawing(true); handleCanvasAction(e, true);
    }
  };

  const handleMouseMove = (e) => {
    if (globalTool === 'select' && !isStandalone) {
      const coords = getCanvasCoords(e); if (!coords) return;
      const { row, col } = coords;
      if (selectionState === 'selecting') {
        setSelectionBounds(prev => ({ ...prev, r2: row, c2: col }));
      } else if (selectionState === 'dragging') {
        const dr = row - dragStart.row; const dc = col - dragStart.col;
        if (dr !== 0 || dc !== 0) {
          setFloatingPixels(prev => ({ ...prev, dr: prev.dr + dr, dc: prev.dc + dc }));
          setSelectionBounds(prev => ({ r1: prev.r1 + dr, c1: prev.c1 + dc, r2: prev.r2 + dr, c2: prev.c2 + dc }));
          setDragStart({ row, col });
        }
      }
    } else if (isDrawing) { handleCanvasAction(e, false); }
  };

  const handleMouseUp = () => {
    if (globalTool === 'select' && !isStandalone) {
      if (selectionState === 'selecting' || selectionState === 'dragging') setSelectionState('selected');
    } else { setIsDrawing(false); }
  };

  const handleCanvasAction = (e, isClick) => {
    const coords = getCanvasCoords(e); if (!coords) return;
    const { row, col } = coords; const { rows, cols } = data.canvasConfig;

    const idx = data.pixelData.findIndex(p => p.row === row && p.col === col); if (idx === -1) return;
    const pixel = data.pixelData[idx];

    if (isHighlightMode && isClick) { setGlobalSelectedColor(pixel.colorKey); return; }
    if (globalTool === 'dropper' && isClick) { setGlobalSelectedColor(pixel.colorKey); setGlobalTool('pen'); message.success(`已吸取 ${pixel.colorKey}`); return; }
    if (isClick) saveHistory();

    if (globalTool === 'bucket' && isClick) {
      if (pixel.colorKey === globalSelectedColor) return;
      const stack = [[row, col]]; const visited = new Set();
      const newPixels = [...data.pixelData]; const pMap = new Map(); newPixels.forEach((p, i) => pMap.set(`${p.row},${p.col}`, i));

      while (stack.length) {
        const [r, c] = stack.pop(); const k = `${r},${c}`;
        if (visited.has(k)) continue;
        const i = pMap.get(k); if (i === undefined) continue;
        if (newPixels[i].colorKey === pixel.colorKey) {
          newPixels[i] = { ...newPixels[i], colorKey: globalSelectedColor }; visited.add(k);
          if (r > 0) stack.push([r - 1, c]); if (r < rows - 1) stack.push([r + 1, c]);
          if (c > 0) stack.push([r, c - 1]); if (c < cols - 1) stack.push([r, c + 1]);
        }
      }
      updateData(newPixels);
    } else if (globalTool === 'pen' && pixel.colorKey !== globalSelectedColor) {
      const newPixels = [...data.pixelData]; newPixels[idx] = { ...pixel, colorKey: globalSelectedColor };
      updateData(newPixels);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      lastTouchDistRef.current = Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2));
      initialZoomRef.current = zoomLevel; e.preventDefault();
    } else if (e.touches.length === 1) { handleMouseDown(e); e.preventDefault(); }
  };
  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const currentDist = Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2));
      if (lastTouchDistRef.current && lastTouchDistRef.current > 0) { setZoomLevel(Math.max(0.3, Math.min(2, initialZoomRef.current * (currentDist / lastTouchDistRef.current)))); }
      e.preventDefault();
    } else if (e.touches.length === 1) { handleMouseMove(e); e.preventDefault(); }
  };
  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) { lastTouchDistRef.current = null; }
    if (e.touches.length === 0) { handleMouseUp(); }
  };

  const filterColors = () => {
    if (!data) return; commitFloatingPixelsSafe(); saveHistory();
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
    updateData(data.pixelData.map(p => ({ ...p, colorKey: map[p.colorKey] || p.colorKey }))); message.success("优化完成");
  };

  const handleMirror = () => {
    if (!data) return; commitFloatingPixelsSafe(); saveHistory();
    updateData(data.pixelData.map(p => ({ ...p, col: data.canvasConfig.cols - 1 - p.col }))); message.success('已水平翻转');
  };

  const handleCopy = () => {
    if (!data) return message.warning('请先生成图纸');
    let sourcePixels = []; let minR = Infinity, minC = Infinity;

    if (floatingPixels) {
      sourcePixels = floatingPixels.pixels.map(p => ({ ...p, row: p.row + floatingPixels.dr, col: p.col + floatingPixels.dc }));
    } else if (selectionBounds) {
      const sr1 = Math.min(selectionBounds.r1, selectionBounds.r2); const sr2 = Math.max(selectionBounds.r1, selectionBounds.r2);
      const sc1 = Math.min(selectionBounds.c1, selectionBounds.c2); const sc2 = Math.max(selectionBounds.c1, selectionBounds.c2);
      sourcePixels = data.pixelData.filter(p => p.row >= sr1 && p.row <= sr2 && p.col >= sc1 && p.col <= sc2);
    } else { return message.warning('请先使用移动工具框选区域'); }

    if (sourcePixels.length === 0) return message.warning('选中区域为空');
    sourcePixels.forEach(p => { if (p.row < minR) minR = p.row; if (p.col < minC) minC = p.col; });
    const normalized = sourcePixels.map(p => ({ ...p, row: p.row - minR, col: p.col - minC }));
    const maxR = Math.max(...normalized.map(p => p.row)); const maxC = Math.max(...normalized.map(p => p.col));

    setClipboard({ pixels: normalized, rows: maxR + 1, cols: maxC + 1 });
    message.success('已复制，可前往另一区域粘贴');
  };

  const handlePaste = () => {
    if (!data) return message.warning('请先生成图纸底板');
    if (!clipboard) return message.warning('剪贴板为空，请先复制');

    commitFloatingPixelsSafe(); setGlobalTool('select'); saveHistory();
    setFloatingPixels({ pixels: clipboard.pixels, dr: 0, dc: 0 });
    setSelectionBounds({ r1: 0, c1: 0, r2: clipboard.rows - 1, c2: clipboard.cols - 1 });
    setSelectionState('selected'); message.success('已粘贴，可拖动虚线框调整位置');
  };

  const executeReplaceColor = () => {
    if (!data || !replaceSourceColor || !replaceTargetColor) return;
    if (replaceSourceColor === replaceTargetColor) { setIsReplaceModalVisible(false); return; }
    saveHistory();
    updateData(data.pixelData.map(p => ({ ...p, colorKey: p.colorKey === replaceSourceColor ? replaceTargetColor : p.colorKey })));
    message.success(`已替换`); setIsReplaceModalVisible(false);
  };

  // 计算缺失色号的相似替代色映射
  const similarColorMap = useMemo(() => {
    const map = {};
    missingColors.forEach(colorKey => {
      const similar = findClosestColorKeyExclude(colorMapRgb[colorKey], missingColors);
      map[colorKey] = similar;
    });
    return map;
  }, [missingColors]);

  // 批量替换缺失色号
  const executeBatchReplace = () => {
    if (!data || missingColors.length === 0) return;
    saveHistory();
    const newPixels = data.pixelData.map(p => {
      if (missingColors.includes(p.colorKey)) {
        return { ...p, colorKey: similarColorMap[p.colorKey] || p.colorKey };
      }
      return p;
    });
    updateData(newPixels);
    message.success(`已替换 ${missingColors.length} 个色号`);
    setIsSimilarModalVisible(false);
    setMissingColors([]);
  };

  const saveImage = () => {
    if (!canvasRef.current || !data) return;

    if (!isStandalone) {
      commitFloatingPixelsSafe();
      setSelectionBounds(null);
    }

    const wasHighlighting = isHighlightMode;
    if (wasHighlighting) setIsHighlightMode(false);

    if (wasHighlighting) {
      message.warning("导出时已自动关闭高亮模式");
      if (isStandalone) setTimeout(() => setIsHighlightMode(true), 1000);
    }

    const doExport = () => {
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

      // ==========================================
      // 【完全原封不动的水印代码段】一字未改！
      // ==========================================
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
      // ==========================================

      const statsStartY = main.height + padding + 40;
      ctx.fillStyle = '#000';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('色号统计ฅ՞•ﻌ•՞ฅ:', padding, statsStartY);

      let currentX = padding;
      let currentY = statsStartY + 25;

      sortedEntries.forEach(([k, c]) => {
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

        currentX += cardWidth + gap;
      });

      cvs.toBlob(b => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.download = isStandalone ? 'pixel-art.png' : `pixel-art-panel${panelId}.png`;
        a.click();
      });
    };

    if (isStandalone) {
      doExport();
    } else {
      setTimeout(() => {
        doExport();
        if (wasHighlighting) setIsHighlightMode(true);
      }, 50);
    }
  };

  // === 行列增删操作 ===
  const addRow = (direction) => {
    if (!data) return;
    commitFloatingPixelsSafe();
    saveHistory();
    const config = data.canvasConfig;
    const isTop = direction === 'top';
    const newRowIndex = isTop ? 0 : config.rows;
    const newPixelData = data.pixelData.map(p => ({ ...p, row: isTop ? p.row + 1 : p.row }));
    for (let c = 0; c < config.cols; c++) {
      newPixelData.push({ row: newRowIndex, col: c, colorKey: 'H2' });
    }
    const newRows = config.rows + 1;
    const counts = {};
    newPixelData.forEach(p => { counts[p.colorKey] = (counts[p.colorKey] || 0) + 1; });
    setData({
      pixelData: newPixelData,
      colorCount: counts,
      totalPixels: newRows * config.cols,
      canvasConfig: { ...config, rows: newRows, height: config.topMargin + newRows * config.cellSize + 40 }
    });
    message.success(`已在${isTop ? '上方' : '下方'}新增一行`);
  };

  const addCol = (direction) => {
    if (!data) return;
    commitFloatingPixelsSafe();
    saveHistory();
    const config = data.canvasConfig;
    const isLeft = direction === 'left';
    const newColIndex = isLeft ? 0 : config.cols;
    const newPixelData = data.pixelData.map(p => ({ ...p, col: isLeft ? p.col + 1 : p.col }));
    for (let r = 0; r < config.rows; r++) {
      newPixelData.push({ row: r, col: newColIndex, colorKey: 'H2' });
    }
    const newCols = config.cols + 1;
    const counts = {};
    newPixelData.forEach(p => { counts[p.colorKey] = (counts[p.colorKey] || 0) + 1; });
    setData({
      pixelData: newPixelData,
      colorCount: counts,
      totalPixels: config.rows * newCols,
      canvasConfig: { ...config, cols: newCols, width: config.leftMargin + newCols * config.cellSize + 20 }
    });
    message.success(`已在${isLeft ? '左侧' : '右侧'}新增一列`);
  };

  const deleteRow = (direction) => {
    if (!data) return;
    const config = data.canvasConfig;
    if (config.rows <= 1) { message.warning('至少需要保留一行'); return; }
    commitFloatingPixelsSafe();
    saveHistory();
    const isTop = direction === 'top';
    const targetRow = isTop ? 0 : config.rows - 1;
    const newPixelData = data.pixelData
      .filter(p => p.row !== targetRow)
      .map(p => ({ ...p, row: isTop ? p.row - 1 : p.row }));
    const newRows = config.rows - 1;
    const counts = {};
    newPixelData.forEach(p => { counts[p.colorKey] = (counts[p.colorKey] || 0) + 1; });
    setData({
      pixelData: newPixelData,
      colorCount: counts,
      totalPixels: newRows * config.cols,
      canvasConfig: { ...config, rows: newRows, height: config.topMargin + newRows * config.cellSize + 40 }
    });
    message.success(`已删除${isTop ? '顶部' : '底部'}一行`);
  };

  const deleteCol = (direction) => {
    if (!data) return;
    const config = data.canvasConfig;
    if (config.cols <= 1) { message.warning('至少需要保留一列'); return; }
    commitFloatingPixelsSafe();
    saveHistory();
    const isLeft = direction === 'left';
    const targetCol = isLeft ? 0 : config.cols - 1;
    const newPixelData = data.pixelData
      .filter(p => p.col !== targetCol)
      .map(p => ({ ...p, col: isLeft ? p.col - 1 : p.col }));
    const newCols = config.cols - 1;
    const counts = {};
    newPixelData.forEach(p => { counts[p.colorKey] = (counts[p.colorKey] || 0) + 1; });
    setData({
      pixelData: newPixelData,
      colorCount: counts,
      totalPixels: config.rows * newCols,
      canvasConfig: { ...config, cols: newCols, width: config.leftMargin + newCols * config.cellSize + 20 }
    });
    message.success(`已删除${isLeft ? '左侧' : '右侧'}一列`);
  };

  // --- 彻底还原样式：100% 退回最初的状态 ---
  const cardStyle = isStandalone
    ? { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }
    : { flex: '1 1 45%', minWidth: 360, display: 'flex', flexDirection: 'column', margin: '4px', border: '1px solid #d9d9d9', borderRadius: '8px' };

  return (
    <Card
      title={isStandalone ? <span><FormatPainterOutlined />拼豆图纸生成器</span> : `图纸区域 ${panelId}`}
      className={isStandalone ? "pixel-editor" : ""}
      style={cardStyle}
      bodyStyle={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', padding: '12px', overflow: 'hidden' }}
    >
      <div style={isStandalone ? { flex: '0 0 auto' } : { flex: '0 0 auto', marginBottom: 8 }}>
        <Space wrap className="control-panel" style={{ width: '100%', gap: 4 }}>
          <Upload accept="image/*" beforeUpload={f => { const r = new FileReader(); r.onload = e => setImageSrc(e.target.result); r.readAsDataURL(f); return false; }} showUploadList={false}>
            <Button type="primary" icon={<UploadOutlined />} size="small">上传</Button>
          </Upload>
          <InputNumber addonBefore="宽" min={1} max={300} value={cols} onChange={setCols} size="small" style={isStandalone ? undefined : { width: 90 }} />
          <InputNumber addonBefore="过滤" min={0} max={20} value={filterThreshold} onChange={setFilterThreshold} size="small" style={isStandalone ? undefined : { width: 90 }} />
          <Button icon={<FilterOutlined />} onClick={filterColors} disabled={!data} size="small">{isStandalone && "优化"}</Button>
          <Button icon={<SwapOutlined />} onClick={handleMirror} disabled={!data} size="small">{isStandalone && "镜像"}</Button>
          <Button icon={<RetweetOutlined />} onClick={() => { if (data) { setReplaceSourceColor(Object.keys(data.colorCount)[0]); setIsReplaceModalVisible(true); } }} disabled={!data} size="small">{isStandalone && "替换"}</Button>

          {isStandalone && (
            <Button type="dashed" danger
              icon={<DragOutlined />} onClick={onEnableAdvanced} size="small" style={{ marginLeft: 8, display: 'none' }}>
              支持移动
            </Button>
          )}

          {!isStandalone && (
            <>
              <Divider type="vertical" />
              <Button icon={<UndoOutlined />} onClick={() => { commitFloatingPixelsSafe(); setSelectionBounds(null); setSelectionState('none'); setRedoStack(p => [data, ...p]); setData(history[history.length - 1]); setHistory(p => p.slice(0, -1)); }} disabled={!history.length} size="small" />
              <Button icon={<RedoOutlined />} onClick={() => { commitFloatingPixelsSafe(); setSelectionBounds(null); setSelectionState('none'); setHistory(p => [...p, data]); setData(redoStack[0]); setRedoStack(p => p.slice(1)); }} disabled={!redoStack.length} size="small" />
              <Divider type="vertical" />
              <Button icon={<CopyOutlined />} onClick={handleCopy} disabled={!data} size="small">复制</Button>
              <Button icon={<SnippetsOutlined />} onClick={handlePaste} disabled={!data || !clipboard} size="small">粘贴</Button>
            </>
          )}

          <Button type="primary" ghost icon={<DownloadOutlined />} onClick={saveImage} disabled={!data} size="small">导出</Button>
        </Space>

        {isStandalone && (
          <>
            <Divider style={{ margin: '6px 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
              <Space wrap size={2}>
                <Radio.Group value={globalTool} onChange={e => setGlobalTool(e.target.value)} buttonStyle="solid" size="small">
                  <Radio.Button value="pen"><EditOutlined /> 画笔</Radio.Button>
                  <Radio.Button value="bucket"><BgColorsOutlined /> 填充</Radio.Button>
                  <Radio.Button value="dropper"><FormatPainterOutlined /> 吸管</Radio.Button>
                </Radio.Group>
                <Button type={isHighlightMode ? "primary" : "default"} icon={<EyeOutlined />} onClick={() => setIsHighlightMode(!isHighlightMode)} danger={isHighlightMode} size="small">
                  {isHighlightMode ? "定位中" : "定位"}
                </Button>
                <Tooltip title="缺少某色号拼豆？点击查找相似替代色">
                  <Button icon={<QuestionCircleOutlined />} onClick={() => { if (data) { setMissingColors([]); setIsSimilarModalVisible(true); } }} disabled={!data} size="small">缺色</Button>
                </Tooltip>
                <Button icon={<UndoOutlined />} onClick={() => { setRedoStack(p => [data, ...p]); setData(history[history.length - 1]); setHistory(p => p.slice(0, -1)); }} disabled={!history.length} size="small" />
                <Button icon={<RedoOutlined />} onClick={() => { setHistory(p => [...p, data]); setData(redoStack[0]); setRedoStack(p => p.slice(1)); }} disabled={!redoStack.length} size="small" />
              </Space>

              <Space size={2} align="center">
                <Space.Compact>
                  <Button size="small" onClick={() => addRow('bottom')} disabled={!data}>下方加行</Button>
                  <Dropdown
                    disabled={!data}
                    trigger={['click']}
                    menu={{
                      items: [
                        { type: 'group', label: '行操作', children: [
                          { key: 'row-add-top',    icon: <ArrowUpOutlined />, label: '上方新增一行', onClick: () => addRow('top') },
                          { key: 'row-add-bottom', icon: <ArrowDownOutlined />, label: '下方新增一行', onClick: () => addRow('bottom') },
                          { key: 'row-del-top',    icon: <ArrowUpOutlined />, label: '上方删除一行', onClick: () => deleteRow('top'), disabled: (data?.canvasConfig?.rows ?? 1) <= 1 },
                          { key: 'row-del-bottom', icon: <ArrowDownOutlined />, label: '下方删除一行', onClick: () => deleteRow('bottom'), disabled: (data?.canvasConfig?.rows ?? 1) <= 1 },
                        ]},
                        { type: 'group', label: '列操作', children: [
                          { key: 'col-add-left',   icon: <ArrowLeftOutlined />, label: '左侧新增一列', onClick: () => addCol('left') },
                          { key: 'col-add-right',  icon: <ArrowRightOutlined />, label: '右侧新增一列', onClick: () => addCol('right') },
                          { key: 'col-del-left',   icon: <ArrowLeftOutlined />, label: '左侧删除一列', onClick: () => deleteCol('left'), disabled: (data?.canvasConfig?.cols ?? 1) <= 1 },
                          { key: 'col-del-right',  icon: <ArrowRightOutlined />, label: '右侧删除一列', onClick: () => deleteCol('right'), disabled: (data?.canvasConfig?.cols ?? 1) <= 1 },
                        ]},
                      ]
                    }}
                  >
                    <Button size="small" icon={<CaretDownOutlined />} />
                  </Dropdown>
                </Space.Compact>
                <Divider type="vertical" style={{ margin: 0 }} />
                <ZoomOutOutlined style={{ fontSize: 12, cursor: 'pointer' }} onClick={() => setZoomLevel(z => Math.max(0.3, z - 0.1))} />
                <Slider min={0.3} max={2} step={0.1} value={zoomLevel} onChange={setZoomLevel} style={{ width: 60 }} />
                <ZoomInOutlined style={{ fontSize: 12, cursor: 'pointer' }} onClick={() => setZoomLevel(z => Math.min(2, z + 0.1))} />
                <div style={{ width: 20, height: 20, background: colorMap[globalSelectedColor], border: '1px solid #ddd', borderRadius: 2 }} />
                <Select showSearch value={globalSelectedColor} onChange={setGlobalSelectedColor} style={{ width: 80 }} size="small" filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}>
                  {sortedKeys.map(k => <Option key={k} value={k} label={k}><Space><div style={{ width: 10, height: 10, border: '1px solid #ddd', background: colorMap[k] }} />{k}</Space></Option>)}
                </Select>
              </Space>
            </div>
          </>
        )}

        {!isStandalone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 12, color: '#666' }}>缩放:</span>
            <ZoomOutOutlined style={{ fontSize: 12, cursor: 'pointer' }} onClick={() => setZoomLevel(z => Math.max(0.3, z - 0.1))} />
            <Slider min={0.3} max={2} step={0.1} value={zoomLevel} onChange={setZoomLevel} style={{ width: 80, margin: '0 8px' }} />
            <ZoomInOutlined style={{ fontSize: 12, cursor: 'pointer' }} onClick={() => setZoomLevel(z => Math.min(2, z + 0.1))} />
          </div>
        )}
      </div>

      <div className={imageSrc ? "canvas-container" : "canvas-container noData"}
        style={isStandalone
          ? { flex: 1, minWidth: 0, minHeight: 200, overflow: 'auto', display: 'flex', position: 'relative', border: '1px solid #f0f0f0', background: '#888' }
          : { flex: 1, minHeight: 200, overflow: 'auto', display: 'flex', position: 'relative', border: '1px solid #f0f0f0', background: '#888', borderRadius: 4 }}>
        <Spin spinning={loading} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {data ? (
            <div style={{ margin: 'auto' }}>
              <canvas
                ref={canvasRef}
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left', transition: 'transform 0.1s', boxShadow: '0 0 10px rgba(0,0,0,0.1)', display: 'block', touchAction: 'none' }}
                onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.8)', gap: 12, margin: 'auto' }}>
              <PictureOutlined style={{ fontSize: 64, opacity: 0.5 }} />
              <span style={{ fontSize: 16 }}>{isStandalone ? '暂无图纸' : `图纸区域 ${panelId} 暂无数据`}</span>
              <span style={{ fontSize: 12, opacity: 0.6 }}>请点击上方上传图片</span>
            </div>
          )}
        </Spin>
      </div>

      {data && <div className="color-palette-area" style={{ flex: '0 0 auto', marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4, maxHeight: isStandalone ? 150 : 120, overflowY: 'auto', paddingRight: 4 }}>
        {Object.entries(data.colorCount).sort((a, b) => b[1] - a[1]).map(([k, c]) => {
          const pct = (c / data.totalPixels) * 100;
          const percentage = pct < 0.1 ? pct.toFixed(3) : pct.toFixed(1);
          return (
            <Tooltip key={k} title={`${k}: ${c}颗 (${percentage}%) - 点击定位`}>
              <div
                onClick={() => { setGlobalSelectedColor(k); setIsHighlightMode(true); }}
                style={{
                  width: isStandalone ? 42 : 40, height: isStandalone ? 75 : 65, border: globalSelectedColor === k ? '2px solid #1890ff' : '1px solid #ddd',
                  borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', background: '#fff',
                  opacity: (isHighlightMode && globalSelectedColor !== k) ? 0.3 : 1, transition: 'all 0.2s'
                }}
              >
                <div style={{ flex: 1, background: colorMap[k], width: '100%' }} />
                <div style={{ height: isStandalone ? 48 : 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', borderTop: '1px solid #eee' }}>
                  <span style={{ fontWeight: 'bold', color: '#333', fontSize: isStandalone ? 11 : 10 }}>{k}</span>
                  <span style={{ color: '#666', fontSize: isStandalone ? 10 : 9 }}>×{c}</span>
                  {isStandalone && <span style={{ color: '#999', fontSize: 9, marginTop: 2 }}>{percentage}%</span>}
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>}

      <Modal title="替换色号" open={isReplaceModalVisible} onOk={executeReplaceColor} onCancel={() => setIsReplaceModalVisible(false)} width={320} destroyOnClose>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
          <div>
            <div style={{ marginBottom: 6, fontSize: 12, color: '#666' }}>原色号</div>
            <Select showSearch value={replaceSourceColor} onChange={setReplaceSourceColor} style={{ width: 110 }}>
              {data && Object.keys(data.colorCount).map(k => <Option key={k} value={k}><Space><div style={{ width: 10, height: 10, background: colorMap[k] }} />{k}</Space></Option>)}
            </Select>
          </div>
          <SwapRightOutlined style={{ fontSize: 24, color: '#bfbfbf', marginTop: 20 }} />
          <div>
            <div style={{ marginBottom: 6, fontSize: 12, color: '#666' }}>新色号</div>
            <Select showSearch value={replaceTargetColor} onChange={setReplaceTargetColor} style={{ width: 110 }}>
              {sortedKeys.map(k => <Option key={k} value={k}><Space><div style={{ width: 10, height: 10, background: colorMap[k] }} />{k}</Space></Option>)}
            </Select>
          </div>
        </div>
      </Modal>

      <Modal
        title={<span><QuestionCircleOutlined style={{ marginRight: 8, color: '#faad14' }} />相似色号查询</span>}
        open={isSimilarModalVisible}
        onOk={executeBatchReplace}
        onCancel={() => { setIsSimilarModalVisible(false); setMissingColors([]); }}
        width={500}
        okText="确认替换"
        cancelText="取消"
        destroyOnClose
      >
        <div style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
          选择您缺少的色号，系统将自动匹配最相似的替代色：
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>选择缺失色号：</div>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择缺失的色号"
            value={missingColors}
            onChange={setMissingColors}
            showSearch
            filterOption={(input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase())}
          >
            {sortedKeys.filter(k => k !== 'H1').map(k => (
              <Option key={k} value={k}>
                <Space>
                  <div style={{ width: 14, height: 14, background: colorMap[k], border: '1px solid #ddd', borderRadius: 2 }} />
                  {k}{data && data.colorCount[k] ? ` (${data.colorCount[k]}颗)` : ''}
                </Space>
              </Option>
            ))}
          </Select>
        </div>
        {missingColors.length > 0 && (
          <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ background: '#fafafa', padding: '10px 16px', fontWeight: 500, borderBottom: '1px solid #f0f0f0' }}>
              替换方案
            </div>
            <div style={{ maxHeight: 240, overflowY: 'auto' }}>
              {missingColors.map(colorKey => {
                const similar = similarColorMap[colorKey];
                return (
                  <div key={colorKey} style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 24, height: 24, background: colorMap[colorKey], border: '1px solid #ddd', borderRadius: 4 }} />
                      <span style={{ fontWeight: 500 }}>{colorKey}</span>
                      <span style={{ color: '#999', fontSize: 12 }}>({data.colorCount[colorKey]}颗)</span>
                    </div>
                    <SwapRightOutlined style={{ fontSize: 18, color: '#bfbfbf', margin: '0 12px' }} />
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 24, height: 24, background: similar ? colorMap[similar] : '#fff', border: '1px solid #ddd', borderRadius: 4 }} />
                      <span style={{ fontWeight: 500, color: similar ? '#52c41a' : '#999' }}>{similar || '无替代'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {missingColors.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: '#bfbfbf' }}>
            请在上方选择缺失的色号
          </div>
        )}
      </Modal>
    </Card>
  );
};

const App = () => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  const [globalTool, setGlobalTool] = useState('pen');
  const [globalSelectedColor, setGlobalSelectedColor] = useState('A1');
  const [isHighlightMode, setIsHighlightMode] = useState(false);
  const [clipboard, setClipboard] = useState(null);

  const sortedKeys = useMemo(() => Object.keys(colorMap).sort((a, b) => {
    const ma = a.match(/^([A-Z]+)(\d+)$/), mb = b.match(/^([A-Z]+)(\d+)$/);
    if (ma && mb) return ma[1] === mb[1] ? parseInt(ma[2]) - parseInt(mb[2]) : ma[1].localeCompare(mb[1]);
    return a.localeCompare(b);
  }), []);

  const handleEnableAdvanced = () => {
    setIsAdvancedMode(true);
    message.success('已开启移动模式：支持区域框选、拖拽，并增加副图纸区辅助');
  };

  const handleDisableAdvanced = () => {
    setIsAdvancedMode(false);
    setGlobalTool('pen');
    setClipboard(null);
    message.info('已返回经典单图纸模式');
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f0f2f5', padding: 0 }}>
      {isAdvancedMode && (
        <div style={{ background: '#fff', padding: '8px 16px', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16, flex: '0 0 auto', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', zIndex: 10 }}>
          <Button type="primary" danger icon={<LeftOutlined />} onClick={handleDisableAdvanced} size="small" style={{ marginRight: 8 }}>
            退出移动模式
          </Button>
          <Divider type="vertical" />

          <Space wrap size={8}>
            <span style={{ fontSize: 13, color: '#666', fontWeight: 'bold' }}>全局工具:</span>
            <Radio.Group value={globalTool} onChange={e => setGlobalTool(e.target.value)} buttonStyle="solid" size="small">
              <Radio.Button value="pen"><EditOutlined /> 画笔</Radio.Button>
              <Radio.Button value="bucket"><BgColorsOutlined /> 填充</Radio.Button>
              <Radio.Button value="dropper"><FormatPainterOutlined /> 吸色</Radio.Button>
              <Radio.Button value="select"><DragOutlined /> 框选/移动</Radio.Button>
            </Radio.Group>
          </Space>

          <Divider type="vertical" />

          <Space size={8} align="center">
            <span style={{ fontSize: 13, color: '#666', fontWeight: 'bold' }}>全局定位:</span>
            <div style={{ width: 24, height: 24, background: colorMap[globalSelectedColor], border: '2px solid #ddd', borderRadius: 4 }} />
            <Select showSearch value={globalSelectedColor} onChange={setGlobalSelectedColor} style={{ width: 90 }} size="small" filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}>
              {sortedKeys.map(k => <Option key={k} value={k} label={k}><Space><div style={{ width: 10, height: 10, border: '1px solid #ddd', background: colorMap[k] }} />{k}</Space></Option>)}
            </Select>
            <Button type={isHighlightMode ? "primary" : "default"} icon={<EyeOutlined />} onClick={() => setIsHighlightMode(!isHighlightMode)} danger={isHighlightMode} size="small" style={{ marginLeft: 8 }}>
              {isHighlightMode ? "取消高亮" : "高亮"}
            </Button>
          </Space>

          {clipboard && (
            <div style={{ marginLeft: 'auto', fontSize: 12, color: '#52c41a', background: '#f6ffed', padding: '4px 8px', border: '1px solid #b7eb8f', borderRadius: 4 }}>
              <SnippetsOutlined /> 已复制区域 ({clipboard.rows}x{clipboard.cols})
            </div>
          )}
        </div>
      )}

      {/* --- 完美兼容：单图模式不嵌套额外 div，直接暴露 CanvasPanel 以确保 App.css 的完全生效 --- */}
      {!isAdvancedMode ? (
        <CanvasPanel
          panelId={1}
          isStandalone={true}
          onEnableAdvanced={handleEnableAdvanced}
          globalTool={globalTool} setGlobalTool={setGlobalTool}
          globalSelectedColor={globalSelectedColor} setGlobalSelectedColor={setGlobalSelectedColor}
          isHighlightMode={isHighlightMode} setIsHighlightMode={setIsHighlightMode}
          clipboard={clipboard} setClipboard={setClipboard}
          sortedKeys={sortedKeys}
        />
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', flex: 1, overflow: 'hidden', padding: 4 }}>
          <CanvasPanel
            panelId={1}
            isStandalone={false}
            onEnableAdvanced={handleEnableAdvanced}
            globalTool={globalTool} setGlobalTool={setGlobalTool}
            globalSelectedColor={globalSelectedColor} setGlobalSelectedColor={setGlobalSelectedColor}
            isHighlightMode={isHighlightMode} setIsHighlightMode={setIsHighlightMode}
            clipboard={clipboard} setClipboard={setClipboard}
            sortedKeys={sortedKeys}
          />
          <CanvasPanel
            panelId={2}
            isStandalone={false}
            globalTool={globalTool} setGlobalTool={setGlobalTool}
            globalSelectedColor={globalSelectedColor} setGlobalSelectedColor={setGlobalSelectedColor}
            isHighlightMode={isHighlightMode} setIsHighlightMode={setIsHighlightMode}
            clipboard={clipboard} setClipboard={setClipboard}
            sortedKeys={sortedKeys}
          />
        </div>
      )}

      <div className="copyright-badge" style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 9999, padding: '6px 12px', background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(4px)', borderRadius: '6px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', fontSize: '12px', color: '#666', textAlign: 'right', pointerEvents: 'auto' }}>
        <div>Made with ❤️ by <span style={{ color: '#ff4d4f', fontWeight: 'bold', margin: '0 4px' }}>xhs：士多啤梨(拼豆发疯版)</span></div>
        <div style={{ transform: 'scale(0.9)', transformOrigin: 'right center', opacity: 0.8 }}>xhs号：95410734438</div>
      </div>
      <Analytics />
    </div>
  );
};

export default App;