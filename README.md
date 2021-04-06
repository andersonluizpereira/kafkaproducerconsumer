

## Kafka single node setup

On a single machine, a **3 broker** kafka instance is at best the minimum, for a hassle-free working. Also, **replication factor is set to 2**.

Say X,Y and Z are our kafka brokers. With replication factor 2, the data in X will be copied to both Y & Z, the data in Y will be copied to X & Z and the data of Z is copied to X & Y.

### Prerequisites
- have java >= 1.8 installed.
-  get **binary** distribution of Kafka from [here](https://kafka.apache.org/downloads) .

### Setup
Extract the contents of the kafka archive to a convenient place and `cd` into it. Use a terminal multiplexer to run the components that make the kafka eco-system.

#### Zookeeper
- Edit the config file `config/server.properties` and change the `dataDir` entry to some place that does not get wiped after a reboot.
Ex:`dataDir=/home/user/tmp/zookeeper`
- Start the zookeeper instance with
`$ bin/zookeeper-server-start.sh config/zookeeper.properties`

#### Kafka brokers
 - In the `config` folder there would be a `server.properties` file. This is the kafka server's config file. We need 3 instances of kafka brokers.
  - Make a copy. `$ cp config/server.properties config/server.b1.properties`
  - In the copy make the following changes
```
broker.id=1  #unique id for our broker instance
port=9092    #port where it listens
delete.topic.enable=true   #if we want to delete kafka topic stored in broker
log.dirs=/home/neoito/kafka-logs/01  #to a place thats not volatile
advertised.host.name=10.0.0.81 #prevents leader not found error when connecting from remote machine
```

  - Make 2 more copies of this file and change the fields `broker.id`, `port` and `log.dirs` for each file.
  - Run the individual brokers like
```
$  bin/kafka-server-start.sh config/server.b1.properties
$  bin/kafka-server-start.sh config/server.b2.properties
$  bin/kafka-server-start.sh config/server.b3.properties
```

**Tip : ** Executing a `$ jps` on the shell would give all JVM instances. To kill the processes `kill -9 <pid>` would do the trick.

##### Testing out the install
- Create a topic with
`$ bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 2 --partitions 3 --topic <topicname>`
 - Push data onto it
 `$ bin/kafka-console-producer.sh --broker-list localhost:9092,localhost:9093,localhost:9094 --sync     --topic <topicname>`
 - Fetch data from it
 `$ bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic <topicname> --from-beginning`

# Program Setup

To start the application in development mode,
```
npm run dev
```

In production mode use,

```
npm start
```

Kafka 

Criar topicos - producer

Entre no container

docker-compose ps

docker exec -it kafka-cluster_kafka-1_1 bash

Como criar um tópico
    kafka-topics --create --bootstrap-server localhost:29092 --replication-factor 3 --partitions 3 --topic meutopico


Como listar os tópicos
    kafka-topics --list --bootstrap-server localhost:29092

Como criar um producer e enviar informações no topico
    kafka-console-producer --broker-list localhost:29092 --topic meutopico

Como criar um producer e enviar informações no topico lendo desde o comeco
	kafka-console-consumer --bootstrap-server localhost:29092 --topic meutopico --from-beginning

Como criar um producer e enviar informações no topico lendo desde o comeco e com grupos
	kafka-console-consumer --bootstrap-server localhost:29092 --topic meutopico --from-beginning --group a

—————————————
Como ler msg para o topico - consumer

Entre na mesma maquina  
	docker exec -it kafka-cluster_kafka-1_1 bash

Criando o consumer
	kafka-console-consumer --bootstrap-server localhost:29092 --topic meutopico

depois digite uma mensagem no console do producer
opa

Como faz para ler de várias partições 

Abra 3 consoles no iterm

Entre na mesma maquina  
	docker exec -it kafka-cluster_kafka-1_1 bash

E rode nos 3 terminais o comando abaixo
	kafka-console-consumer --bootstrap-server localhost:29092 --topic meutopico --from-beginning --group a

Vc vai ver que ele vai direcionar para cada partição


Como ver os topicos criados
	kafka-topics --describe --bootstrap-server localhost:29092 --topic meutopico

Vendo como os brokers se distribuem e as estruturas de um tópico
	kafka-consumer-groups --group a --bootstrap-server localhost:29092 --describe

Agora mate o processo de um dos consumer rode o comando acima vc vai ver como fica as distribuições e leitura de partições


