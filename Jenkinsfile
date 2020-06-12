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
                 echo 'Build..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                  echo 'Deplpoy..'
            }
        }
    }
}
