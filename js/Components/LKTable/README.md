# PolyTable
    接受参数
    dataSource:Array<object>,
    columns:Array<object>,
    rowKey:function
##### columns
    title: string  标题,
    dataIndex: string 展现的字段,
    render: function  自定义表现
##### rowKey
    返回当前数据列表唯一标示
##### dataSource
    请求返回的数据



### eg：

    const dataSource = [
        {
            id:1,
            name:'cai',
            age:16
        },
        {
            id:2,
            name:'yan',
            age:17
        },
        {
            id:3,
            name:'zu',
            age:18
        }
    ];
    const columns = [
        {
            title:'code',
            dataIndex:'id'
        },
        {
            title:'name',
            dataIndex:'name'
        },
        {
            title:'age',
            dataIndex:'age'
        }
    ];
    const rowKey = (rows) => {
        return rows.id
    }


    <PolyTable
        dataSource={dataSource}
        columns={columns}
        rowKey={rowKey}
    />
