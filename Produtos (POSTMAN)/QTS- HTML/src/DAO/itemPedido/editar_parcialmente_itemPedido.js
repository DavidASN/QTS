const { conexao } = require('../conexao.js')

async function editarParcialmenteItemPedido(id, id_pedido, id_produto, campo, valor) {
    const data = [valor, id, id_pedido, id_produto]

    // Lista dos campos permitidos para edição
    const colunasPermitidas = ['qnt']
    if (!colunasPermitidas.includes(campo)) {
        throw new Error('Coluna inválida')
    }

    const sql = `UPDATE tbl_itempedido SET ${campo} = ? WHERE id = ? AND id_pedido = ? AND id_produto = ?;`
    const conn = await conexao()

    try {
        const [results] = await conn.query(sql, data)
        await conn.end()
        return results
    } catch (err) {
        return err.message
    }
}

module.exports = { editarParcialmenteItemPedido }
