
exports.up = function(knex, Promise) {
    return knex.schema.createTable('veiculos', table => {
        table.increments('id').primary(),
        table.string('placa').notNull().unique(),
        table.string('chassi').notNull().unique(),
        table.string('renavam').notNull().unique(),
        table.string('modelo').notNull(),
        table.string('marca').notNull(),
        table.string('ano').notNull()
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('veiculos');
  };
  /**
   * Aqui estão nossa criação de banco de dados com seus respectivos tipos de dados e chaves.
   * 
   */