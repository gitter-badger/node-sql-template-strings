"use strict";
var SQLStatement = (function () {
    function SQLStatement(strings, values) {
        this.strings = strings;
        this.values = values;
    }
    Object.defineProperty(SQLStatement.prototype, "query", {
        /**
         * The SQL Statement for [Sequelize](https://www.npmjs.com/package/sequelize)
         */
        get: function () {
            return this.bind ? this.text : this.sql;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SQLStatement.prototype, "text", {
        /**
         * The SQL Statement for [node-postgres](https://www.npmjs.com/package/pg)
         */
        get: function () {
            return this.strings.reduce(function (prev, curr, i) { return prev + '$' + i + curr; });
        },
        enumerable: true,
        configurable: true
    });
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
    SQLStatement.prototype.append = function (statement) {
        if (statement instanceof SQLStatement) {
            this.strings[this.strings.length - 1] += statement.strings[0];
            this.strings.push.apply(this.strings, statement.strings.slice(1));
            (this.values || this.bind).push.apply(this.values, statement.values);
        }
        else {
            this.strings[this.strings.length - 1] += statement;
        }
        return this;
    };
    /**
     * Use a prepared statement with Sequelize.
     * Makes `query` return a query with `$n` syntax instead of `?`  and switches the `values` key name to `bind`
     * If omitted, `value` defaults to `true`.
     */
    SQLStatement.prototype.useBind = function (value) {
        if (value === void 0) { value = true; }
        if (value && !this.bind) {
            this.bind = this.values;
            delete this.values;
        }
        else if (!value && this.bind) {
            this.values = this.bind;
            delete this.bind;
        }
        return this;
    };
    /**
     * @param {string} name
     * @returns {this}
     */
    SQLStatement.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    return SQLStatement;
}());
exports.SQLStatement = SQLStatement;
Object.defineProperty(SQLStatement.prototype, 'sql', {
    enumerable: true,
    get: function () {
        return this.strings.join('?');
    }
});
/**
 * The template string tag
 *
 * ```ts
 * import {SQL} from 'sql-template-strings';
 *
 * pg.query(SQL`SELECT author FROM books WHERE name = ${book} AND author = ${author}`)
 * ```
 */
function SQL(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    // the strings argument is a read-only array, which is why we need to clone it
    return new SQLStatement(strings.slice(0), values.slice(0));
}
exports.SQL = SQL;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SQL;
module.exports = SQL;
//# sourceMappingURL=index.js.map