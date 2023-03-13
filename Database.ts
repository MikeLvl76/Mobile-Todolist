import * as SQLite from 'expo-sqlite';

export const DB = SQLite.openDatabase(`todos.db`);

export const createTable = (name: string): void => {
    DB.transaction(tx => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS ${name} (\
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
          title TEXT NOT NULL,\
          status INTEGER NOT NULL);`, [], undefined, (_, err) => {
            console.log(err)
            return false;
        });
    });
}

export const insertInto = (name: string, data: { title: string, status: number }): void => {
    createTable(name);
    DB.transaction(tx => {
        tx.executeSql(`INSERT INTO ${name} (title, status)\
          VALUES ("${data.title}", ${data.status});`, [], undefined, (_, err) => {
            console.log(err)
            return false;
        });
    });
}

export const deleteFrom = (name: string): void => {
    DB.transaction(tx => {
        tx.executeSql(`DELETE FROM ${name} WHERE status = 1;`, [], undefined, (_, err) => {
            console.log(err)
            return false;
        });
    });
}

export const update = (name: string, id: number, status: number): void => {
    DB.transaction(tx => {
        tx.executeSql(`UPDATE ${name} SET status = ${status} WHERE id = ${id}`, [], undefined, (_, err) => {
            console.log(err)
            return false;
        });
    });
}
