﻿namespace SimplyRecipes.Data.Seeding
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Options;

    using SimplyRecipes.Common.Config;
    using SimplyRecipes.Data.Models;
    using SimplyRecipes.Data.Models.Enumerations;

    public class UsersSeeder : ISeeder
    {
        public async Task SeedAsync(
            SimplyRecipesDbContext dbContext,
            IServiceProvider serviceProvider,
            IOptions<ApplicationConfig> appConfig)
        {
            var userManager = serviceProvider
                .GetRequiredService<UserManager<SimplyRecipesUser>>();

            if (!await userManager.Users
                .AnyAsync(x => x.UserName == appConfig.Value.AdministratorUserName))
            {
                var user = new SimplyRecipesUser
                {
                    UserName = appConfig.Value.AdministratorUserName,
                    Email = appConfig.Value.AdministratorEmail,
                    FirstName = appConfig.Value.AdministratorFirstName,
                    LastName = appConfig.Value.AdministratorLastName,
                    Gender = Gender.Male
                };

                var result = await userManager.CreateAsync(user, appConfig.Value.AdministratorPassword);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, appConfig.Value.AdministratorRoleName);
                }
                else
                {
                    throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
                }
            }
        }
    }
}
