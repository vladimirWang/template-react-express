### 添加外键
#### belongsTo操作
**A.belongsTo(B) 一个B对一多个A, 外键记录在A上**
1 被依赖的表要先被创建
2 外键字段要单独addColumn加入 ( 如外键形如fooId，会被自动加上; 如形如foo_id则需手动 addColumn )
3 加上外键约束 
```javascript
    await queryInterface.addConstraint('People', {
      fields: ['hobby_id'],
      type: 'foreign key',
      name: 'fk1_hobby',
      references: { //Required field
        table: 'Hobbies',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
```

4 Model定义
```javascript
  class People extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      People.belongsTo(models.Hobby, {
        foreignKey: 'hobby_id'
      })
      // define association here
    }
  };
  People.init({
    name: DataTypes.STRING,
    hobby_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Hobbys",
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'People',
  });
```

#### hasMany

### SUM使用
```sql
SELECT SUM(count), productId FROM stocks GROUP BY productId;
```
```javascript
const ret2 = await Stock.findAll({
  attributes: [
    [Sequelize.fn('SUM', Sequelize.col('count')), 'count'],
    'productId',
  ],
  group: 'productId'
})
```

```javascript
// 只能查出分组后的第一个
const ret = await Stock.sum('count', { group: 'productId' })
```

### 设置关联查询时的字段
```javascript
// 取Stock表的所有字段
const ret3 = await Product.findAll({
  attributes: [
    'productName',
    'id'
  ],
  include: Stock
})
// 取特定字段
const ret3 = await Product.findAll({
  attributes: [
    'productName',
    'id'
  ],
  include: {
    model: Stock,
    attributes: {
      exclude: ['id']
    }
  }
})

const ret3 = await Product.findAll({
  attributes: [
    'productName',
    'id'
  ],
  include: {
    model: Stock,
    attributes: ['count', 'id']
  }
})
```

## 数据库事务
三种模式
1. 隐式开启，隐式提交
   默认即为这种形式

2. 隐式开启，显示提交
```sql
show variables like "autocommit";
set autocommit=1; // 1开启  0关闭
```
3. 显示开启，显示提交
```sql
start transaction;
update tb set field_name=9 WHERE id = 1;
commit;
```

commit和rollback后数据库事务都结束

设置保存点和回滚至保存点
```sql
savepoint one; -- 设置保存点
rollback to one; -- 回滚至指定点
release savepoint; -- 删除保存点
```