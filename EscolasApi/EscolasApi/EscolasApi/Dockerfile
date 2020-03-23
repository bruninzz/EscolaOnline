FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["EscolasApi/EscolasApi.csproj", "EscolasApi/"]
RUN dotnet restore "EscolasApi/EscolasApi.csproj"
COPY . .
WORKDIR "/src/EscolasApi"
RUN dotnet build "EscolasApi.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "EscolasApi.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "EscolasApi.dll"]