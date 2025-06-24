const { conexao } = require('../conexao.js')

async function editarParcialmenteEndereco(id, campo, valor) {
    const data = [valor, id]

    const colunasPermitidas = ['logradouro', 'cep', 'numero', 'bairro', 'cidade']
    if (!colunasPermitidas.includes(campo)) {
        throw new Error('Coluna inválida')
    }

    const sql = `UPDATE tbl_endereco SET ${campo} = ? WHERE id = ?`
    const conn = await conexao()
    
    try {
        const [results] = await conn.query(sql, data)
        await conn.end()
        return results
    } catch (err) {
        return err.message
    }
}

module.exports = { editarParcialmenteEndereco }
