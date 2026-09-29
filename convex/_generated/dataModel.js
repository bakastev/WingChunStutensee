/* eslint-disable */
export type DataModel = {
  contacts: {
    document: {
      _id: string;
      _creationTime: number;
      name: string;
      email: string;
      topic: string;
      message: string;
      consent: boolean;
      status: "new" | "read" | "archived";
      createdAt: number;
    };
    fieldPaths: string;
    indexes: Record<string, unknown>;
    searchIndexes: Record<string, unknown>;
    vectorIndexes: Record<string, unknown>;
  };
  news: {
    document: {
      _id: string;
      _creationTime: number;
      title: string;
      slug: string;
      excerpt: string;
      body: string;
      image?: string;
      publishedAt: number;
      published: boolean;
    };
    fieldPaths: string;
    indexes: Record<string, unknown>;
    searchIndexes: Record<string, unknown>;
    vectorIndexes: Record<string, unknown>;
  };
};
