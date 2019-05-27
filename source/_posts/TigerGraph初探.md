---
title: TigerGraph图数据库初探
date: 2019-05-27
categories: 图数据库
top: true
---

# <center> TigerGraph Demo </center>

## 1  安装TigerGraph

​	[官方网址](<https://tigergraph.com/download>)，选择`Developer Edition`进行注册，下载对应系统环境的程序。

## 2  Demo演示

### 2.1  图模型

​	包括**如何创建图模式，向图中加载数据，编写简单的参数化查询以及运行查询**。  

​	在TigerGraph数据库中，数据实体被称为节点（`vertex`），节点之间的关联用边来表示。节点和边都可以具有属性（`properties` or `attributes`），简单的图模型如下图所示：   

![img](https://doc.tigergraph.com/attachments/680427521/681672883.png)

​	图模型是用于描述可以出现在图中节点和边类型的模型，以上图为例，图中有一种节点（人物）和一种边（好友关系）。因此，这个图模型可以用下图来描述：  

![img](https://doc.tigergraph.com/attachments/680427521/688488599.png)

### 2.2  数据集  

 教程中自己创建了两个数据集，分别是用户数据集和关系数据集。如下所示：  

**person.csv**

	name,gender,age,state
	Tom,male,40,ca
	Dan,male,34,ny
	Jenny,female,25,tx
	Kevin,male,28,az
	Amily,female,22,ca
	Nancy,female,20,ky
	Jack,male,26,fl
**friendship.csv**

```
person1,person2,date
Tom,Dan,2017-06-03
Tom,Jenny,2015-01-01
Dan,Jenny,2016-08-03
Jenny,Amily,2015-06-08
Dan,Nancy,2016-01-03
Nancy,Jack,2017-03-02
Dan,Kevin,2015-12-30
```

### 2.3  数据导入

#### 2.3.1  启动TigerGraph与GSQL

启动TigerGraph    

> ```shell
> > gadmin start all
> ```
>
> 启动GSQL    
>
> > ```shell
> > > gsql
> > ```
> >
> > 可以在GSQL的命令行使用`ls`命令查看数据库。由于是第一次使用，所以显示为空：    
> >
> > ![1558950715646](<http://a1.qpic.cn/psb?/V14RoQOQ2suUoC/K2kvAhY4FBIBckp7cLOb68wJ84Ul5c0Xm*sqsm5E20E!/b/dAgBAAAAAAAA&ek=1&kp=1&pt=0&bo=rgG8AK4BvAADGTw!&tl=1&vuin=595819371&tm=1558958400&sce=60-4-3&rf=viewer_4>)

需要清空数据库的话，使用`drop all`命令并使用命令`gadmin restart -fy`重启TigerGraph服务即可。  

#### 2.3.2  定义图模式 

创建GSQL图的第一步是定义其架构，GSQL提供了类似SQL DLL的数据定义语言，用于建模节点类型、边类型和图。  

1. **创建节点类型**

   定义`人物`节点类型，类似SQL。包括必须的主键（`PRIMARY_ID`），字段名称以及值的数据类型。 

   ```shell
   CREATE VERTEX person (PRIMARY_ID name STRING, name STRING, age INT, gender STRING, state STRING)
   ```

   ![1558951281156](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/qTQocDuZxATsJbmTPe08Cdv6n9vIquEFoBm8LgKtuLA!/r/dFQBAAAAAAAA>)

2. **创建边类型**  

   ```shell
   CREATE UNDIRECTED EDGE friendship (FROM person, To person, connect_day DATATIME)
   ```

   ![1558951377061](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/vIXmB3ocDY*63zg05uexjDBEAdXp07M26GQsHWdcP.Y!/r/dL8AAAAAAAAA>)

3. **创建图**

   ```shell
   CREATE GRAPH social (person, friendship)
   ```

   ![1558953873243](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/pMBhtW35w*iI.ROrQniGyDC.PBpcu1rsuG9OQKeKsGg!/r/dL8AAAAAAAAA>)

   运行`ls`查看我们创建的图模型  

   ![1558953951026](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/4l4*UKg1a6cXU*PI9he0rIL0.nlx*OSBCdAFuGLScCo!/r/dLYAAAAAAAAA>)

#### 2.3.3  载入数据

 	将上述`person.csv`和`friendship.csv`存储到文件中，路径为`"/home/tigergraph/filename"`，执行以下代码载入数据到图中。

```shell
USE GRAPH social # 指定要载入数据的图
BEGIN 
CREATE LOADING JOB load_social FOR GRAPH social {  # 创建一个加载作业
DEFINE FILENAME file1=”/home/tigergraph/person.csv”; # 定义文件变量名
DEFINE FILENAME file2=”/home/tigergraph/friendship.csv”; 
LOAD file1 TO VERTEX person VALUES ($”name”, $”name”, $”age”, $”gender”, $”state”) USING header=”true”, separator=”,”; # 文件1载入到节点person中，注意字段的对应
LOAD file2 TO EDGE friendship VALUES ($0, $1, $2) USING header=”true”, separator=”,”; 
}  # 文件2载入到边friendship中，并以逗号为分割符
END
```

![1558955106233](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/i5VVI1qNWMBO6zYrAcCjqdPetsjv.e2.deKM4DuuKqs!/r/dDUBAAAAAAAA>)

​	创建好加载作业后，开始运行任务。命令行执行：  

```shell
RUN LOADING JOB load_social
```

![1558955219522](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/XeNNe45R3L7OoAR1pGDB5gbSULZnESQj5zTLUizuKZk!/r/dIMAAAAAAAAA>)

到这里，数据导入就完成了。接下来可以对图进行查询等操作。

###  2.4  查询

#### 2.4.1  数量查询

例子1：  

```shell
select count() from person # 查询person条目
```

![1558955432920](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/0js2.c3USvWdxbhbdQcJAgfvvdUAgCdPgNoSaCA*eKw!/r/dMUAAAAAAAAA>)

例子2：  

```shell
select count from person-(friendship)->person # 查询边的条目
```

![1558955513000](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/W*eECnQYjafwnncOEFVo6NK2fC6RH8d5ktIoWPocAd8!/r/dLYAAAAAAAAA>)

由于我们定义的是无向图，所以每条边会被计算两次。

例子3：

除了上述两种方法查询节点和边的数量信息之外，还可以在shell中使用`status`命令进行图整体信息的查询。

```shell
gadmin status graph -v
```

![1558956446920](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/fxXnT0jJGXUl7niNz*dQyVE6oSW*QRPrxd7*m6VGdTs!/r/dFMBAAAAAAAA>)

#### 2.4.2  节点查询

例子3：  

```shell
select * from person where primary_id == "Tom" # 查询名字为Tom的人物信息
```

![1558955672223](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/FrD2A9Jmcqi0g*obIqABsAS2fKdkcGEn7XXFAJUYXgw!/r/dLgAAAAAAAAA>)

例子4：  

```shell
select name from person where state == "ca" # 查询国籍为ca的人物姓名
```

![1558955754752](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/DIMTfmCrkoWoxumZ6qbPklArFqXdBEKRLQD3nQ30r6E!/r/dL4AAAAAAAAA>)

例子5：

```shell
select name, age from person where age > 30 # 查询年龄大于30岁的人物姓名和年龄
```

![1558955840655](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/eHvhngXyAMuaamFsGS4sEdGrSS.Qz5U2sdfXofLFoeU!/r/dLgAAAAAAAAA>)

#### 2.4.3  边查询

例子1：  

```shell
select * from person-(friendship)->person where from_id == "Tom" # 查询源节点为Tom，边类型为friendship且指向节点类型为人物的边
```

![1558956043184](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/atkFqR3XWbMFUb4YRBX7G6OoaVxzsDTmK9Wob3mEFjo!/r/dL8AAAAAAAAA>)

例子2：

```shell
select * from person-(any)->any where from_id == "Tom" # 查询源节点（from_id）为Tom，指向任意类型节点的任意类型的边
```

由于我们的demo数据中只有一种节点类型和一种边类型，因此这里的返回结果和例子1是一样的。

#### 2.4.4  参数化GSQL查询

参数化GSQL查询步骤为：

1. 定义查询
2. 在GSQL中安装查询，为每个查询生成端点
3. 执行查询

例子1： 查询节点的1-hop邻居

第一步：定义查询。在当前目录新建一个.gsql文件，填充如下内容：

```shell
USE GRAPH social 
CREATE QUERY neighbor_1(VERTEX<person> p) FOR GRAPH social{
  Start = {p};
  Result = SELECT tgt
           FROM Start:s-(friendship:e) ->person:tgt;
  PRINT Result;
}
```

在GSQL shell中输入：

```shell
@neighbor_1.gsql 

ls
```

![1558957992888](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/EtzpeU70rFbLBgDr.ZekNr8wztmSDDxfmAJVjokvJ7c!/r/dL8AAAAAAAAA>)

第二步：安装查询，将自定义的查询作业安装到GSQL中。  

```shell
install query neighbor_1
```

![1558958142039](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/0qWN7iNmES*0IH2vyTjWAZrE32hKrERO10rQQFomtIA!/r/dFMBAAAAAAAA>)

第三步：运行查询  

```shell
run query neighbor_1("Tom") # 查询Tom的一阶邻居
```

![1558958267967](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/OmXGY9zUggV8sy3bvdwR4U4702MaIPssBtqYS2v2TPI!/r/dDUBAAAAAAAA>)

**以REST端点运行查询 ** 

实际上，在我们安装自定义查询后，GSQL将自动生成一个REST端点，以便可以通过http调用参数化查询。这里以Linux中最常用的`curl`命令来提交http查询请求。在Linux shell中输入如下命令：

```shell
curl -X get "http://localhost:9000/query/social/neighbor_1?p=Tom"
```

![1558958625575](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/mDX*9RW1lc1J6MPnhl*WmTQbi0FPn3ozXFQ2MkPevMk!/r/dL8AAAAAAAAA>)

通过show命令可以查看自定义查询函数的内容：

```shell
show query neighbor_1 # GSQL shell
```

![1558958750340](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/vG9sB433bFybYplUF3Dx84zeqEwDQG5YWVpLkPDyCdI!/r/dFMBAAAAAAAA>)

### 2.5  高级查询

自定义查询函数，实现二阶邻居的查询。  

第一步： 创建hello2.gsql文件，内容如下：

```shell
USE GRAPH social
CREATE QUERY hello2 (VERTEX<person> p) FOR GRAPH social{
  OrAccum  @visited = false; # 定义局部累加器visited，用一个@表示局部变量
  AvgAccum @@avgAge; # 定义全局累加器avgAge，用两个@@表示全局变量
  Start = {p}; # 初始出发节点p：函数的传入参数
  FirstNeighbors = SELECT tgt
                   FROM Start:s -(friendship:e)-> person:tgt
                   ACCUM tgt.@visited += true, s.@visited += true;
                   # 一阶邻居遍历
  SecondNeighbors = SELECT tgt
                    FROM FirstNeighbors -(:e)-> :tgt
                    WHERE tgt.@visited == false # 过滤已被遍历的节点
                    POST_ACCUM @@avgAge += tgt.age; # 使用POST_ACCUM而不是ACCUM，为了遍历点集而非边集（边会遍历两遍）
				   # 二阶邻居遍历

  PRINT SecondNeighbors; # 输出二阶邻居
  PRINT @@avgAge; # 返回二阶邻居的平均年龄
}
INSTALL QUERY hello2 # 安装查询
RUN QUERY hello2(“Tom”) # 执行查询
```

第二步：运行文件  

```shell
gsql hello2.gsql
```

![1558959092538](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/.gntkjUESUhIOcxIl5XLSoVAyk8mb7nFqAKss9TWcgw!/r/dL4AAAAAAAAA>)

![1558959103232](<http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/WPUrqaimOsb.oIJzrUut3CVZ.dlQOE.ejtMEkdAZAlc!/r/dFYBAAAAAAAA>)

