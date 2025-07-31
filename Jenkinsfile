pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/aakash9112000/projectCardWebApp'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'CI=false npm run build'
            }
        }

        stage('Archive Build Files') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                        echo "Copying build files to EC2..."
                        scp -o StrictHostKeyChecking=no -r build/* ec2-user@<EC2_PUBLIC_IP>:/var/www/react-app/
                        echo "Deployment complete!"
                    '''
                }
            }
        }

    }
}
