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
        stage('Build') {
            steps {
               sh "docker images"
               sh "docker build -t consumer-finance-house-quote-api:v${BUILD_NUMBER} ."
               sh "docker images"
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
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
    }
}
