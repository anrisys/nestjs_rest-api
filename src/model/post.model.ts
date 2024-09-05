export class PostCreateRequest {
  content: string;
  authorId: string;
}

export class PostUpdateRequest {
  id: string;
  content: string;
}
