import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from '../../context/TranslationContext';

interface TranslatedTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const TranslatedText = memo(({ text, className = '', as: Component = 'span' }: TranslatedTextProps) => {
  const { translate, currentLang } = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    let isMounted = true;

    const doTranslate = async () => {
      try {
        const result = await translate(text);
        if (isMounted) {
          setTranslatedText(result);
        }
      } catch (error) {
        console.error('Translation error:', error);
        if (isMounted) {
          setTranslatedText(text);
        }
      }
    };

    doTranslate();

    return () => {
      isMounted = false;
    };
  }, [text, currentLang, translate]);

  return React.createElement(Component, {
    className,
    key: `${text}-${currentLang}`,
    children: translatedText
  });
});

TranslatedText.displayName = 'TranslatedText';

export default TranslatedText;
