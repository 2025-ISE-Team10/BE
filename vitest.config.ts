import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    sequence: {
      concurrent: false, // 테스트 파일을 한 번에 하나씩만 실행
    },
    poolOptions: {
      maxThreads: 1,
      minThreads: 1,
    },
  },
});
