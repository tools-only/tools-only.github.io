---
title: 贝叶斯分类器
date: 2019-03-04
categories: ML
top: true
---

# 贝叶斯分类器(Bayesian decision classifiers)

# 1 贝叶斯理论

​	贝叶斯决策论是概率框架下实施决策的基本方法，对于分类任务，在所有相关概率都已知的情形下，贝叶斯决策论考虑如何基于这些概率和误判损失来选择最优的类别标记。    

​	例如，我们现在有一个图像分类的任务，总共有N种类别，记为$\{c_1,c_2,...,c_N\}$。首先，我们需要定义一个损失函数：令$\lambda_{ij}$表示将一个真实类别为$c_j$的图像分类为$c_i$所产生的损失。由此，可以给出将样本$x$分类为$c_i$所产生的期望损失，即在样本$x$上的“条件风险”：     

​						$$R(c_i \ | \ x)=\sum_{j=1}^{N} \lambda_{ij}P(c_j \ | \ x)$$    

![1551677435918](http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/NqzZ57HIqGGpoLst89XLh06BrX7xh3LHy*4DDI42pwc!/r/dDYBAAAAAAAA)

​	有了损失函数，我们就可以将分类任务转化为最小化损失函数的问题。假设我们的分类函数为$h(x)$，则我们的任务是找到一个较好的映射，使得下面的损失函数最小：    

​						$$ R(h) = \mathbb E_x[R(h(x) \ |\ x)]$$   

​	上面的式子是对于单个样本$x$来说的，为了最小化总体风险(损失)，一个直观的想法就是：对每个样本都选择使条件风险$R(c \ | \ x)$最小的类别标记，那么总体风险也就最小了（和子图分割的那个例子有什么关系？损失函数的定义是否合理？是否会导致过拟合？）。这就是贝叶斯判定准则的思想。形式化表述如下：  

​						$$h^*(x) = \arg \min _{c \in \mathbb y} {R(c\ | \ x)}$$

# 2 生成式模型与判别式模型

​	从上面的优化式子中可以看出，后验概率$P(c \ |\ x)$直接影响损失函数的大小。因此，首先需要获取$P(c\ | \ x)$，这其实就是机器学习所要实现的：从有限的训练样本集中尽可能准确地估计出后验概率$P(c\ | \ x)$。实现这一目标可以采用两种策略：  

​	1.  给定样本$x$，根据训练样本的类别标记，直接建模$P(c \ | \ x)$来预测$c$，这样得到的便是“判别式模型”；  

​	2.  先对联合概率分布$P(x,c)$建模，然后再由此获得$P(c\ |\ x)$，这样得到的称为“生成式模型”。    

​	对于生成式模型而言，建模过程为：    

​						$$P(c \ | \ x) = \frac{P(x, \ c)}{P(x)} = \frac{P(c) \ P(x\ |\ c)}{P(x)}$$

![1551680237733](http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/LBxmkEP3NIrKzkbmr5Q18qqeLJ.W2bSFd6pSBfhkxqk!/r/dL8AAAAAAAAA)

​	上图中的问题1：如何估计$P(c)$？    

​	$P(c)$表达了样本空间中各类样本所占的比例，当训练集中包含充足的独立同分布样本时(这实际上是种假设，留到后面整理类别不平衡时再详细记录)，$P(c)$可通过各类样本出现的频率来进行估计。  

​	问题2：如何估计$P(x\ |\ c)$？  

​	类条件概率$P(x\ |\ c)$涉及关于$x$所有属性的联合概率，直接根据样本出现的频率来估计将会遇到严重的困难。假设样本有$d$个二值属性，那么样本空间将有$2^d$种可能的取值。可能很多样本取值在训练集中根本没有出现（可能是“未被观测到”，而不是“出现的概率为0”），因此直接估计显然不行。

# 3 极大似然估计

​	估计类条件概率的一种常用策略是**先假定其具有某种确定的概率分布形式，再基于训练样本对概率分布的参数进行估计。** 假设$P(x\ | \ c)$具有确定的形式并且被参数向量$\theta_c$唯一确定，则问题变成了利用训练集$D$估计参数$\theta_c$。这里将$P(x \ | \ c)$记为$P(x \ | \ \theta_c)$。（模型训练过程即参数估计过程）    

​	应用频率学派的参数估计方法：	通过优化似然函数来确定参数值。  

![1551681880203](http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/zyi8ofIkhJ9wcRGtuqzLiDxGF8a2A4U.Gxq241641Gk!/r/dL8AAAAAAAAA)

​	这种方法虽然相对简单，但是其**结果准确性严重依赖与所假设的概率分布类型是否符合潜在的真实数据分布。**   

# 4 朴素贝叶斯分类器

​	Q：何为**朴素**？  

​	朴素贝叶斯分类器属于生成式模型的一种，其建模过程与第2部分生成式模型建模相同：    

![1551682988544](http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/6BdvAuRBHUieGoQCbmCsQ00PnzMvhLSwC9iLBg*ic98!/r/dL4AAAAAAAAA)

​	从上图可以看到，朴素贝叶斯分类器避开了求所有属性的联合概率，而是假设所有属性相互独立，即每个属性独立地对分类结果发生影响（很明显这个假设在很多情况下是不符合现实的，因此朴素贝叶斯分类器在处理属性间有较强的关联关系的分类任务时效果会受影响。）。最后，由于$P(x)$对每个类别来说都是一样的，因此可以将朴素贝叶斯的判定准则形式化表示为：  

​						$h_{nb}(x) = \arg \min_{c\in \mathbb y}P(c) \prod_{i=1}^d P(x_i\ | \ c)$

​	具体地，朴素贝叶斯分类器对类先验概率$P(c)$和每个属性条件概率$P(x_i \ | \ c)$的估计过程如下图：  

![1551684027470](http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/O50AUdK1aP7Q*T1sNt6W2wRfqtXJoZeCm6CxlR842M4!/r/dL8AAAAAAAAA)

# 5 具体例子

​	这里为了方便计算，我选择了知乎回答[@忆臻](https://zhuanlan.zhihu.com/p/26262151)的例子。数据如下：  

![image](https://pic3.zhimg.com/v2-ccf99fcbded18b80b8d9d8553be1eec6_r.jpg)

​	问题是：如果一个男生四个属性分别是[不帅、性格不好、身高矮、不上进]，那么女生会选择嫁还是不嫁呢?  

​	这个问题转化为我们上面的数学形式就是计算：  

​	$P(嫁\ |\ (不帅、性格不好、身高矮、不上进))$和

​	$P(不嫁\ |\ (不帅、性格不好、身高矮、不上进))$ 的值，然后选择概率较大的回答。  

​	首先来看，如果我们直接对属性联合概率$P( (不帅、性格不好、身高矮、不上进)\ | \ 嫁)$进行建模，会发现数据中根本没有 [不帅、性格不好、身高矮、不上进]的样本。接下来我们利用朴素贝叶斯的方法来进行概率估计：  

![1551686635164](http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/tK4v.B.q2lm3nqg5TX7AtF4w.R.37DVRnd43blVBvpA!/r/dL4AAAAAAAAA)

![1551686648134](http://r.photo.store.qq.com/psb?/V14RoQOQ2suUoC/D87HgEGEJU.TfxIk.u8wv3xfVu5xcsBtaHUAfeWqqAg!/r/dDcBAAAAAAAA)