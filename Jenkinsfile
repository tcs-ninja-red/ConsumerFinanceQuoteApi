pipeline {
    agent any
      stages {
        stage('Checkout') {
            steps {
                step([$class: 'WsCleanup'])
                checkout scm
            }
        }
        stage('Environment') {
            steps {
                sh 'git --version'
                echo "Branch: ${env.BRANCH_NAME}"
                sh 'docker -v'
                sh 'printenv'
            }
        }
         stage('Unit Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Sonar Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Build') {
            steps {
               sh "docker images"
               sh "docker build -t consumer-finance-house-quote-api:v${BUILD_NUMBER} ."
               sh "docker images"
            }
        }
        stage('Deploy') {
            steps {
                sh "docker ps -a"
                sh 'docker stop api-quotes-container || exit 0'
                sh 'docker kill api-quotes-container || exit 0'
                sh 'docker rm api-quotes-container || exit 0'
                sh "docker run -d --name api-quotes-container -p 44301:44301 consumer-finance-house-quote-api:v${BUILD_NUMBER}"
                sh "docker ps -a"
            }
        }

        stage('upload') {
            steps {
                sh "docker images"
                sh 'docker login -u admin -p admin123 51.132.233.171:8083'
                sh "docker tag consumer-finance-house-quote-api:v${BUILD_NUMBER} 51.132.233.171:8083/consumer-finance-house-quote-api:v${BUILD_NUMBER}"
                sh "docker push 51.132.233.171:8083/consumer-finance-house-quote-api:v${BUILD_NUMBER}"
                echo "nexus upload successful"
            }
        }
    }
}
