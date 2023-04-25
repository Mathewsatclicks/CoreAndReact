using API.Extensions; 
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationservices(builder.Configuration);
var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();


//---------------------------------
using var scope=app.Services.CreateScope(); 
var services=scope.ServiceProvider;

try
{
    var contecxt=services.GetRequiredService<DataContext>();
     await contecxt.Database.MigrateAsync();
    await Seed.SeedData(contecxt);
}
catch (System.Exception ex)
{
     var logger=services.GetRequiredService<ILogger<Program>>();
     logger.LogError(ex,"Error occure during the migration");
}

app.Run();
