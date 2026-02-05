import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LiveDataStreamingSvc = () => {

  const [persistentArray, setPersistentArray] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      let newArray = [...persistentArray];
      for (let i = 0; i < 1000; i++) {
        newArray = [
          ...newArray,
          {
          id: Math.random(),
          data: new Array(500)?.fill('✨ some dynamic data over from streaming service'),
          timestamp: Date.now()
        }];
      }
      
      // Limit the array size to prevent memory issues
      if (newArray.length > 2000) {
        newArray = newArray.slice(-2000); // Keep only the most recent 2000 items
      }
      
      setPersistentArray(newArray);

    }, 2000);

    // Cleanup function to clear interval
    return () => {
      clearInterval(interval);
    };

  }, [persistentArray]);

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Activity" size={20} color="var(--color-accent)" />
          Live data from streaming service
        </h3>
      </div>
      <div>
        {persistentArray?.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Initializing data stream...
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Streaming {persistentArray?.length} data packets...
          </p>
        )}
      </div>
    </div>
  );
};

export default LiveDataStreamingSvc;