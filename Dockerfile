# Deploying the applicaiton is  in Fly.io
# to install postgress sql in docker below command
# docker run --name dev -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:latest



#building environment

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

#copy .csproj and restore as distict layers in the docker image


COPY "Reactivities.sln"  "Reactivities.sln" 
COPY "API/API.csproj" "API/API.csproj" 
COPY "Application/Application.csproj" "Application/Application.csproj" 
COPY "Persistence/Persistence.csproj" "Persistence/Persistence.csproj" 
COPY "Domain/Domain.csproj" "Domain/Domain.csproj" 
COPY "Infrastructure/Infrastructure.csproj" "Infrastructure/Infrastructure.csproj" 


RUN dotnet restore "Reactivities.sln"


# copy everything else build

COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out

#build a runtime image 

#for pubilsh sdk not required, only runtime enough
FROM mcr.microsoft.com/dotnet/aspnet:7.0 
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet","API.dll"]

# after defiining above docker image dependecy projects and dotnet
# to build image  Termianl > docker build -t mathewpothanamuzhiyil/reactivities .

#run the docker and remove the build 
#Terminal>  docker run --rm -it -p 8080:80 mathewpothanamuzhiyil/reactivities


#docker hub login, Terminal >  docker login
#docker login -u "mathewpothanamuzhiyil" -p "@Myjackfruit1" docker.io
#push the docker image to docker hub : Terminal > docker push mathewpothanamuzhiyil/reactivities:latest