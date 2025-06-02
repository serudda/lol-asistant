# @lol-assistant/cron-scripts

## ⚡️ Requirements for Job Queue (BullMQ)

To use the Job Queue (BullMQ) architecture, you need a running Redis server. The simplest and free option is to use Docker:

### Run Redis with Docker (recommended for development)

```bash
docker run -d --name redis-bullmq -p 6379:6379 redis:7-alpine
```

- This creates a container named `redis-bullmq` and exposes port 6379 on your local machine.
- You can check if it's running with:
  ```bash
  docker ps
  ```
- To stop it:
  ```bash
  docker stop redis-bullmq
  ```
- To remove it:
  ```bash
  docker rm redis-bullmq
  ```

---

## 🗓️ Weekly Batch Scraping: Step-by-Step Guide

Follow these steps every week to run the full champion counters scraping process:

### 1. Start Redis in Docker (if not already running)

```bash
docker start redis-bullmq
```

- If the container does not exist, create it with:
  ```bash
  docker run -d --name redis-bullmq -p 6379:6379 redis:7-alpine
  ```
- You can check if it's running with:
  ```bash
  docker ps
  ```

### 2. Enqueue all champion jobs

From the project root:

```bash
pnpm script:run enqueueChampionScrapeJobs
```

- This will enqueue a job for every champion in the database.

### 3. Start the worker to process jobs

In a new terminal (you can run multiple workers for more speed):

```bash
pnpm script:run championScrapeWorker
```

- By default, each worker processes 2 jobs in parallel.
- To increase parallelism (e.g., 5 at a time):
  ```bash
  WORKER_CONCURRENCY=5 pnpm script:run championScrapeWorker
  ```
- You can run this on multiple machines if they all connect to the same Redis instance.

### 4. Let it run!

- The worker(s) will keep processing jobs until the queue is empty.
- You can leave your PC running overnight; the system will pick up where it left off if interrupted.

### 5. (Optional) Stop Redis when done

```bash
docker stop redis-bullmq
```

---

**Tip:** You can automate the enqueue step with a cron job or GitHub Action if you want this to be fully hands-off.

Package for managing and executing scheduled scripts, both locally and through Vercel Cron Jobs.

## Structure

- `src/scripts/`: Contains all individual scripts
- `src/run.ts`: Runner for local script execution
- `src/index.ts`: Exports the scripts that will be exposed as functions for Vercel Cron Jobs

## Running Scripts Locally

You can run any script using one of the following methods:

### From the Root Directory

```bash
pnpm script:run <script-name>
```

For example, to run the sample script:

```bash
pnpm script:run sample-script
```

### From Within the Package

```bash
pnpm --filter @lol-assistant/cron-scripts run script:run <script-name>
```

For example, to run the sample script:

```bash
pnpm --filter @lol-assistant/cron-scripts run script:run sample-script
```

### Passing Parameters to Scripts

You can pass parameters using the `key=value` format:

```bash
pnpm script:run sample-script timestamp=true message="Custom message"
```

For boolean parameters, numbers, or other JSON data types, use JSON format:

```bash
pnpm script:run sample-script active=true count=42 data='{"key":"value"}'
```

### Viewing Available Scripts

If you run the command without specifying a script, you'll see a list of available scripts:

```bash
pnpm script:run
```

## Creating a New Script

To create a new script:

1. Create a TypeScript file in `src/scripts/`, for example: `my-script.ts`
2. Implement a default function (can be async):

```typescript
type MyScriptOptions = {
  param1?: string;
  param2?: boolean;
};

export default async function myScript(options: MyScriptOptions = {}) {
  // Your logic here...
  console.log('Running my script with options:', options);

  return {
    status: 'success',
    result: 'Script completed',
  };
}

// Optional: Allow running the script directly
if (process.argv[1] === import.meta.url) {
  myScript({ param1: 'default value' }).then(console.log).catch(console.error);
}
```

3. If you want the script to be available for Vercel Cron Jobs, export it in `src/index.ts`:

```typescript
export { default as myScript } from './scripts/my-script';
```

## Integration with Vercel Cron Jobs

To configure a script as a Cron Job in Vercel:

1. Make sure the script is exported in `src/index.ts`
2. Create a serverless endpoint in `api/crons/my-script.ts` that imports and executes your script
3. Configure the cron job in Vercel pointing to that endpoint

For more details, see the Vercel Cron Jobs documentation:
[Vercel Cron Jobs Documentation](https://vercel.com/docs/cron-jobs)
