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
                sh '''
                    echo "Starting React build..."
                    CI=false npm run build

                    echo "Build folder contents:"
                    ls -l build || echo "Build folder not found!"
                '''
            }
        }

        stage('Archive Build Files') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-key']) {
                    sh '''
                        echo "Checking local build folder before SCP:"
                        ls -l build || echo "No build folder!"

                        echo "Creating target directory on EC2..."
                        ssh -o StrictHostKeyChecking=no ubuntu@15.206.187.59 "sudo mkdir -p /var/www/react-app && sudo chown -R ubuntu:ubuntu /var/www/react-app"

                        echo "Copying build files to EC2..."
                        scp -r -o StrictHostKeyChecking=no build/* ubuntu@15.206.187.59:/var/www/react-app/

                        echo "Deploying build to NGINX root..."
                        ssh -o StrictHostKeyChecking=no ubuntu@15.206.187.59 '
                            sudo rm -rf /var/www/html/* &&
                            sudo cp -r /var/www/react-app/* /var/www/html/ &&
                            sudo systemctl restart nginx
                        '

                        e
