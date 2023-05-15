FROM mcr.microsoft.com/donet/sdk: 7.0 AS build-env
WORKDIR /app

#copy .csproj and restore as distict layers


COPY "Reactivities.sln"  "Reactivities.sln" 
COPY "API/API.csproj" "API/API.csproj" 
COPY "Application/Application.csproj" "Application/Application.csproj" 
COPY "Persistence/Persistence.csproj" "Persistence/Persistence.csproj" 
COPY "Domain/Domain.csproj" "Domain/Domain.csproj" 
COPY "Infrastructure/Infrastructure.csproj" "Infrastructure/Infrastructure.csproj" 


RUN donet restore "Reactivities"


# copy everything else build

COPY .. 
WORKDIR /app
RUN donet publish -c Release -o out

#build a runtime image


FROM mcr.microsoft.com/donet/aspnet: 7.0 
WORKDIR /app
COPY --from =build-env /app/out .

ENTRYPOINT ["donet","API.dll"]