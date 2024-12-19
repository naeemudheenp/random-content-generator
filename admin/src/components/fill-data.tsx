import { Button } from '@strapi/design-system';
import { useEffect, useState } from 'react';

export function FillRandomData() {
  const [configs, setConfigs] = useState({ enabled: true });
  const generateRandomData = () => {
    return {
      title: 'Random Title ' + Math.random().toString(36).substring(7),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };
  };
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await fetch('/random-content-filler/get-configs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (Object.keys(data).length != 0) setConfigs(data);
      } catch (error) {
        console.error('Error fetching configs:', error);
      }
    };

    fetchConfigs();
  }, []);

  if (!configs.enabled) {
    return;
  }
  return (
    <Button
      onClick={async () => {
        try {
          const randomData = generateRandomData();

          const inputFields = document.querySelectorAll(
            'input, textarea, select,div[role="textbox"]'
          );

          inputFields.forEach((input: any) => {
            if (input.name === 'title') {
              input.value = randomData.title;
              console.log('DIVDFAFDS', input);
            } else if (input.name === 'description') {
              input.value = randomData.description;
            } else if (input.tagName === 'DIV') {
              input.textContent = randomData.description;
            } else {
              input.value = `Random ${Math.random().toString(36).substring(7)}`;
            }
          });
        } catch (error) {
          console.log('Error');
        }
      }}
    >
      Fill random data
    </Button>
  );
}
