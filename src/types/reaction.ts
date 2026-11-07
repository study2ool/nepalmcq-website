export type ReactionType = "like" | "dislike" | "none";

export interface QuestionReactionStats {
  questionId: string;
  likesCount: number;
  dislikesCount: number;
  userReaction: "like" | "dislike" | null;
}
