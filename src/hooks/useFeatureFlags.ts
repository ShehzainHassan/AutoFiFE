export const useFeatureFlags = () => {
  const isAIEnabled = process.env.NEXT_PUBLIC_AI_ENABLED === "true";
  return { isAIEnabled };
};
