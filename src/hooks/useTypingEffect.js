import { useEffect, useState } from "react";

export default function useTypingEffect(
  phrases,
  { typingSpeed = 70, erasingSpeed = 40, pauseTime = 1600 } = {},
) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];
    let timeout;

    if (!isDeleting && text === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setPhraseIndex((i) => i + 1);
    } else {
      const next = isDeleting
        ? currentPhrase.slice(0, text.length - 1)
        : currentPhrase.slice(0, text.length + 1);
      timeout = setTimeout(
        () => setText(next),
        isDeleting ? erasingSpeed : typingSpeed,
      );
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    phraseIndex,
    phrases,
    typingSpeed,
    erasingSpeed,
    pauseTime,
  ]);

  return text;
}
