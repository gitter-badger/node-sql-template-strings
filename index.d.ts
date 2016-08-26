export declare class SQLStatement {
    /**
     * The SQL Statement for [mysql](https://www.npmjs.com/package/mysql)
     */
    sql: string;
    /**
     * The SQL Statement for [Sequelize](https://www.npmjs.com/package/sequelize)
     */
    query: string;
    /**
     * The SQL Statement for [node-postgres](https://www.npmjs.com/package/pg)
     */
    text: string;
    /**
     * The values to be inserted for the placeholders
     */
    values: string[];
    /**
     * The name for postgres prepared statements, if set
     */
    name: string;
    /**
     * Replacements for [Sequelize](https://www.npmjs.com/package/sequelize) in case bound queries are used
     */
    bind: string[];
    private strings;
    constructor(strings: string[], values: any[]);
    /**
     * Appends a string or another statement
     *
     * ```ts
     * query.append(SQL`AND genre = ${genre}`).append(' ORDER BY rating')
     * query.text   // => 'SELECT author FROM books WHERE name = $1 AND author = $2 AND genre = $3 ORDER BY rating'
     * query.sql    // => 'SELECT author FROM books WHERE name = ? AND author = ? AND genre = ? ORDER BY rating'
     * query.values // => ['harry potter', 'J. K. Rowling', 'Fantasy'] ORDER BY rating`
     *
     * const query = SQL`SELECT * FROM books`
     * if (params.name) {
     *   query.append(SQL` WHERE name = ${params.name}`)
     * }
     * query.append(SQL` LIMIT 10 OFFSET ${params.offset || 0}`)
     * ```
     */
    append(statement: SQLStatement | string | number): this;
    /**
     * Use a prepared statement with Sequelize.
     * Makes `query` return a query with `$n` syntax instead of `?`  and switches the `values` key name to `bind`
     * If omitted, `value` defaults to `true`.
     */
    useBind(value?: boolean): this;
    /**
     * @param {string} name
     * @returns {this}
     */
    setName(name: string): this;
}
/**
 * The template string tag
 *
 * ```ts
 * import {SQL} from 'sql-template-strings';
 *
 * pg.query(SQL`SELECT author FROM books WHERE name = ${book} AND author = ${author}`)
 * ```
 */
export declare function SQL(strings: string[], ...values: any[]): SQLStatement;
export default SQL;
