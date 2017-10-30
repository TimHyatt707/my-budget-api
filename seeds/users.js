exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "Regulator",
          hashed_password: "K3$n4#$F",
          email: "shoruye38@hotmail.com"
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))"
      );
    })
    .then(() => {
      return knex("categories")
        .del()
        .then(() => {
          return knex("categories").insert([
            {
              id: 1,
              user_id: 1,
              name: "Food",
              limit: 300
            },
            {
              id: 2,
              user_id: 1,
              name: "Transportation",
              limit: 200
            },
            {
              id: 3,
              user_id: 1,
              name: "Personal Care",
              limit: 100
            }
          ]);
        })
        .then(() => {
          return knex.raw(
            "SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories))"
          );
        });
    })
    .then(() => {
      return knex("transactions")
        .del()
        .then(() => {
          return knex("transactions").insert([
            {
              id: 1,
              user_id: 1,
              category_id: 1,
              name: "Coffee",
              amount: 2.5,
              created_at: "2016-06-26 14:26:16 UTC"
            },
            {
              id: 2,
              user_id: 1,
              category_id: 1,
              name: "Takeout",
              amount: 10,
              created_at: "2016-06-26 14:26:16 UTC"
            },
            {
              id: 3,
              user_id: 1,
              category_id: 2,
              name: "Clipper Card",
              amount: 100,
              created_at: "2016-06-26 14:26:16 UTC"
            },
            {
              id: 4,
              user_id: 2,
              category_id: 1,
              name: "Gasoline",
              amount: 30,
              created_at: "2016-06-26 14:26:16 UTC"
            }
          ]);
        })
        .then(() => {
          return knex.raw(
            "SELECT setval('transactions_id_seq', (SELECT MAX(id) FROM transactions))"
          );
        });
    });
};
