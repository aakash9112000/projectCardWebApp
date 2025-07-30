pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/aakash9112000/projectCardWebApp'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }
    }
}
