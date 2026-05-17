# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY src/SampleApp/*.csproj ./SampleApp/
RUN dotnet restore ./SampleApp/SampleApp.csproj

COPY src/SampleApp/. ./SampleApp/
RUN dotnet publish ./SampleApp/SampleApp.csproj -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Non-root user for security (best practice on ECS)
RUN adduser --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

COPY --from=build /app/publish .

# ECS health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "SampleApp.dll"]
