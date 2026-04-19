# Azure Functions Deployment Plan - Maidoravintola Backend

## Project Overview
- **Application**: Maidoravintola Restaurant Backend
- **Technology Stack**: Node.js 22+ with TypeScript, Azure Functions v4
- **Database**: MySQL (Azure Database for MySQL - existing connection configured)
- **Target Region**: Finland North / West Europe
- **Deployment Method**: Azure Developer CLI (azd) with Bicep IaC

## Architecture Components
```
┌─────────────────┐    ┌──────────────────┐    ┌────────────────────┐
│  Azure Function │────│Application       │────│MySQL Database     │
│  App (FC1)      │    │Insights          │    │(Azure DB for MySQL)│
└─────────────────┘    └──────────────────┘    └────────────────────┘
        │
        └─── Functions:
             ├── createBooking
             ├── listBookings  
             └── health
```

## Infrastructure Requirements

### 1. Azure Resources to Create
- **Resource Group**: `rg-maidoravintola-backend-[env]`
- **Function App**: `func-maidoravintola-backend-[unique]` (Flex Consumption FC1)
- **Storage Account**: `st[unique]funcbackend` (Standard LRS)
- **Application Insights**: `appi-maidoravintola-backend-[env]`
- **Log Analytics Workspace**: `law-maidoravintola-backend-[env]`

### 2. Configuration Settings
```json
{
  "FUNCTIONS_WORKER_RUNTIME": "node",
  "FUNCTIONS_EXTENSION_VERSION": "~4",
  "WEBSITE_NODE_DEFAULT_VERSION": "~20",
  "MYSQL_HOST": "maidodatabase.mysql.database.azure.com",
  "MYSQL_USER": "maidoadmin",
  "MYSQL_DATABASE": "maidodatabase"
}
```

### 3. Security Configuration
- **Authentication**: Function-level keys (default configuration)
- **Database**: Secure connection string in Key Vault or App Settings
- **Network**: Public access (no VNet integration initially)  
- **HTTPS**: Required (default for Function Apps)

## Deployment Strategy

### Best Practices Applied
✅ **Flex Consumption Plan (FC1)**: As per Azure Functions deployment best practices  
✅ **Linux OS**: Recommended for Node.js functions  
✅ **Application Insights**: Enabled for monitoring and telemetry  
✅ **Extension Bundle v4**: For Azure Functions v4 compatibility  
✅ **Managed Identity**: For secure Azure resource access  
✅ **Infrastructure as Code**: Using Bicep with Azure Verified Modules (AVM)

### Deployment Steps
1. **Readiness Validation**: Check project structure, config, and Azure authentication
2. **Policy Compliance**: Verify subscription policies and constraints  
3. **Quota Validation**: Ensure regional capacity for required resources
4. **Infrastructure Provisioning**: Using `azd up` with Bicep templates
5. **Code Deployment**: Automated deployment via Azure Developer CLI
6. **Post-Deployment Testing**: Function endpoint validation and monitoring setup

## Risk Mitigation
- **Database Credentials**: Masked in logs, stored in App Settings
- **Cleanup Protocol**: `azd down --force` for failed deployments
- **Alternative Deployment**: Azure CLI fallback if azd encounters issues  
- **Monitoring**: Application Insights for real-time health monitoring

## Success Criteria
- ✅ All 3 functions (createBooking, listBookings, health) deployed and accessible
- ✅ MySQL database connectivity established  
- ✅ Application Insights telemetry flowing
- ✅ Function endpoints returning proper responses
- ✅ No security vulnerabilities in configuration

## Resource Naming Convention
- Environment: `prod` (single environment)
- Unique suffix: Generated based on subscription/location hash
- Consistent prefixes: `rg-`, `func-`, `st`, `appi-`, `law-`