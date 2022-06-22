# Config Modules

## 工作流

### GitHub Action 工作流

```
1. 在仓库的根目录中执行 pnpm changeset；
2. 提交更改;
3. 在 GitHub 创建提交到 master 分支的 pr 并合并。
```

### 普通工作流

```
1. 在仓库的根目录中执行 pnpm changeset；
2. 运行 pnpm changeset version；
3. 运行 pnpm install。
4. 提交更改；
5. 运行 pnpm publish -r。
```