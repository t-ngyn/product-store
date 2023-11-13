import React from "react";
const SkipContext = React.createContext<{
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
}>({
  skip: 0,
  setSkip: () => {
    return;
  },
});

const SkipProvider = ({ children }: { children: React.ReactNode }) => {
  const [skip, setSkip] = React.useState<number>(0);

  return (
    <SkipContext.Provider value={{ skip, setSkip }}>
      {children}
    </SkipContext.Provider>
  );
};

export { SkipContext, SkipProvider };
