const { conexao } = require('../conexao.js')

async function editarIntegralmenteItemPedido(infos, id, id_pedido, id_produto) {
    const sql = `
        UPDATE tbl_itempedido 
        SET qnt = ? 
        WHERE id = ${id} AND id_pedido = ${id_pedido} AND id_produto = ${id_produto};
    `
    const conn = await conexao()

    try {
        const [results] = await conn.query(sql, [...infos])
        await conn.end()
        return results
    } catch (err) {
        return err.message
    }
}

module.exports = { editarIntegralmenteItemPedido }
