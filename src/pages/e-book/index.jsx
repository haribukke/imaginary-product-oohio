import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import PerformanceMonitor from '../../components/ui/PerformanceMonitor';
import Icon from '../../components/AppIcon';
import BlockRenderer from './components/BlockRenderer';
import TableOfContents from './components/TableOfContents';
import { generateLargeBlockData } from './components/blockData';
import Modal from './components/Modal';

const Ebook = () => {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedBlock, setDraggedBlock] = useState(null);
  const [editingBlock, setEditingBlock] = useState(null);
  const [renderCount, setRenderCount] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const blockRefs = useRef({});

  useEffect(() => {
    setRenderCount(renderCount + 1);
  });

  useEffect(() => {
    const largeData = generateLargeBlockData(500);

    // Simulate blocking synchronous processing
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += Math.sqrt(i);
    }

    setBlocks(largeData);
    setIsLoading(false);

    //this is not required
    // const handleScroll = () => {
    //   console.log('Scrolling...', window.scrollY);
    // };
    // window.addEventListener('scroll', handleScroll);

    // const interval = setInterval(() => {
    //   setBlocks(prev => [...prev]);
    // }, 1000);
  }, []);

  // Effect to detect which heading is currently in view
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveHeading();
          ticking = false;
        });
        ticking = true;
      }
    };

    const updateActiveHeading = () => {
      const scrollPosition = window.scrollY + 120; // Account for header and offset
      
      // Get all heading blocks
      const headingBlocks = blocks.filter(block => 
        ['heading1', 'heading2', 'heading3'].includes(block.type)
      );

      let activeHeading = null;

      // Find the heading that's currently in view
      for (let i = headingBlocks.length - 1; i >= 0; i--) {
        const blockId = headingBlocks[i].id;
        const element = blockRefs.current[blockId];

        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = element.offsetTop;
          
          if (elementTop <= scrollPosition) {
            activeHeading = blockId;
            break;
          }
        }
      }

      setActiveHeadingId(activeHeading);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize active heading
    updateActiveHeading();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [blocks]);

  // Action Handler
  const handleBlockAction = (action) => {
    if (!action) return;

    switch (action.type) {
      case 'modal':
        if (typeof action.content === 'object' && !React.isValidElement(action.content) && action.content.title) {
           setModalContent(
             <div className="space-y-4">
               <h3 className="text-xl font-bold">{action.content.title}</h3>
               <p>{action.content.text}</p>
               <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-mono">Block ID: {action.content.blockId}</p>
               </div>
             </div>
           );
        } else {
           setModalContent(action.content);
        }
        setIsModalOpen(true);
        break;
      
      case 'redirect':
        if (action.url) {
          window.open(action.url, '_blank');
        }
        break;
      
      case 'custom':
        if (typeof action.handler === 'function') {
          action.handler();
        }
        break;
        
      default:
        console.warn('Unknown action type:', action.type);
    }
  };

  const handleDragStart = (blockId) => {
    setDraggedBlock(blockId);
    setBlocks([...blocks]);
  };

  const handleDragOver = (e, targetId) => {
    e?.preventDefault();
    setBlocks(prev => {
      const newBlocks = [...prev];
      return newBlocks;
    });
  };

  const handleDrop = (e, targetId) => {
    e?.preventDefault();
    if (!draggedBlock || draggedBlock === targetId) return;

    const draggedIndex = blocks?.findIndex(b => b?.id === draggedBlock);
    const targetIndex = blocks?.findIndex(b => b?.id === targetId);
    
    const newBlocks = [...blocks];
    const [removed] = newBlocks?.splice(draggedIndex, 1);
    newBlocks?.splice(targetIndex, 0, removed);
    
    setBlocks(newBlocks);
    setDraggedBlock(null);
  };

  const handleBlockEdit = (blockId, newContent) => {
    setEditingBlock(blockId);
    setBlocks(blocks?.map(block => {
      if (block?.id === blockId) {
        return { ...block, content: newContent };
      }
      return { ...block };
    }));
  };

  const getBlockStats = () => {
    let totalWords = 0;
    let totalImages = 0;
    let totalCode = 0;
    
    blocks?.forEach(block => {
      if (block?.type === 'paragraph' || block?.type === 'heading') {
        totalWords += block?.content?.split(' ')?.length || 0;
      }
      if (block?.type === 'image') totalImages++;
      if (block?.type === 'code') totalCode++;
    });
    
    return { totalWords, totalImages, totalCode };
  };

  const navigateToBlock = (blockId) => {
    const element = blockRefs.current[blockId];
    if (element) {
      // Calculate offset position accounting for header height
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Highlight the target block temporarily
      element.classList.add('ring-2', 'ring-primary');
      setTimeout(() => {
        if (element) {
          element.classList.remove('ring-2', 'ring-primary');
        }
      }, 2000);
    }
  };

  const stats = getBlockStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <PerformanceMonitor />
        <main className="pt-[76px] flex items-center justify-center h-screen">
          <div className="text-center">
            <Icon name="Loader2" className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading blocks (this will take a while)...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PerformanceMonitor />
      <main className="pt-[76px] pb-12">
        <TableOfContents blocks={blocks} onNavigate={navigateToBlock} activeHeadingId={activeHeadingId} />
        <div className="max-w-5xl ml-[280px] px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Icon name="AlertTriangle" className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">E book</h1>
                <p className="text-muted-foreground mt-1">Not a book</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {blocks?.map((block, index) => (
              <div
                key={block?.id}
                ref={el => blockRefs.current[block.id] = el}
                draggable
                onDragStart={() => handleDragStart(block?.id)}
                onDragOver={(e) => handleDragOver(e, block?.id)}
                onDrop={(e) => handleDrop(e, block?.id)}
                className={`transition-all ${
                  draggedBlock === block?.id ? 'opacity-50' : ''
                } ${
                  editingBlock === block?.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <BlockRenderer
                  block={block}
                  onEdit={(content) => handleBlockEdit(block?.id, content)}
                  isEditing={editingBlock === block?.id}
                  onAction={handleBlockAction}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        content={modalContent} 
      />
    </div>
  );
};

export default Ebook;