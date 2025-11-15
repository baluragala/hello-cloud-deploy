You are an expert GCP DevOps engineer.  
Generate a complete enterprise-ready CI/CD setup for a containerized microservice using:

1. Cloud Build (CI)
2. Cloud Deploy (CD)
3. Cloud Run (runtime environment)
4. Artifact Registry (images)
5. Skaffold (for Cloud Deploy manifests)

=== ARCHITECTURE ===
• Code push triggers Cloud Build.
• Cloud Build runs unit tests, builds Docker image, pushes to Artifact Registry.
• Cloud Build then creates a Cloud Deploy release.
• Cloud Deploy deploys the service to 3 environments: - dev - staging - prod
• Cloud Run runs a separate service per environment: - order-api-dev - order-api-stg - order-api-prod

=== WHAT TO GENERATE ===
❶ A sample microservice in Node.js (Express):

- `/health` endpoint
- `/orders` POST endpoint with validation
- Configurable via SERVICE_ENV env var

❷ Dockerfile (production optimized)

❸ cloudbuild.yaml:

- Run tests
- Build image
- Push to Artifact Registry
- Create Cloud Deploy release
- Use substitutions for SERVICE_NAME, REGION, REPO_NAME, IMAGE_TAG

❹ clouddeploy.yaml:

- Delivery pipeline: dev → stg → prod
- Cloud Run targets for all 3 envs
- Proper IAM annotations
- Approvals where needed

❺ skaffold.yaml:

- Cloud Run deployment configs
- Per-environment service overrides
- SERVICE_ENV env variables
- Private or public ingress annotations
- Rollout strategy: managed

❻ README.md:

- How to enable required APIs
- How to create Artifact Registry repo
- How to initialize Cloud Deploy
- How to create triggers for CI/CD
- How to promote releases from dev → stg → prod
- Rollback procedures

=== REQUIREMENTS ===
• Use asia-south1 as region
• Use order-api as service name
• Use order-api-repo as Artifact Registry repo
• Follow enterprise coding standards and folder structure
• Include comments in configs for clarity
• Avoid dummy placeholders—use real GCP commands
• Output everything in separate code blocks

Generate all files as if you are creating a production-ready codebase.
Be precise, concise, and use best practices.
