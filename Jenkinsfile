pipeline {
    agent any

    environment {
        EC2_IP = '15.206.187.59'
        EC2_USER = 'ubuntu'
        EC2_PATH = '/var/www/react-app'
    }

    stages {
        
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/aakash9112000/projectCardWebApp'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                echo 'Building React app...'
                sh '''
                    CI=false npm run build
                    echo "Build folder contents:"
                    ls -l build || echo "Build folder not found!"
                '''
            }
        }

        stage('Archive Build Files') {
            steps {
                echo 'Archiving build artifacts...'
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "Deploying build to EC2 (${EC2_IP})..."
                sshagent(['ec2-key']) {
                    sh '''
                        echo "Checking local build folder before deploy:"
                        ls -l build || echo "No build folder found!"

                        echo "Copying build files to EC2 instance..."
                        scp -r -o StrictHostKeyChecking=no build/* ${EC2_USER}@${EC2_IP}:${EC2_PATH}/

                        echo "Deployment to EC2 completed!"
                    '''
                }
            }
        }
    }
}
