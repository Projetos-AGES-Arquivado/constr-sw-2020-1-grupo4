sudo yum install git docker -y 

sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo systemctl start docker

sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_12.x | sudo -E bash -
sudo yum install -y nodejs

git clone https://github.com/AGES-PUCRS/constr-sw-2020-1-grupo4.git
cd constr-sw-2020-1-grupo4/

sudo docker volume create constrsw-pgdata
sudo docker-compose up -d
