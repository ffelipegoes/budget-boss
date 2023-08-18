const { DataTypes } = require('sequelize')
const conn = require('../db/conn')

const Lancamento = conn.define('Lancamentos',
{
    
    id_lancamento:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    data_lancamento:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        require: true
    },
    tipo_lancamento:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        require: true
    },
    categoria_Lancamento:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        require: true
    },
    descricao_lancamento:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        require: true
    },
    valor_lancamento:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        require: true
    }

},
{
    freezeTableName: true
}
)