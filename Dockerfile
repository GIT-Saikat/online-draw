# Stage 1: The Build Stage
FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy all monorepo-level config files and the source code
COPY . .

# Install pnpm and all monorepo dependencies
RUN npm install -g pnpm && pnpm install

# Build the applications using Turborepo
RUN pnpm run build

# Stage 2: The Production/Runner Stage
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Install pnpm in this stage
RUN npm install -g pnpm

# Copy the build outputs and other necessary files from the builder stage
COPY --from=builder /app/apps/excalidraw-frontend ./apps/excalidraw-frontend
COPY --from=builder /app/apps/http-backend ./apps/http-backend
COPY --from=builder /app/apps/ws-backend ./apps/ws-backend
COPY --from=builder /app/packages ./packages 
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install only production dependencies
RUN pnpm install --prod

# Expose the ports for your applications
EXPOSE 3000
EXPOSE 3001

# Command to run all services
CMD ["sh", "-c", "pnpm --filter http-backend start & pnpm --filter ws-backend start & pnpm --filter excalidraw-frontend start"]