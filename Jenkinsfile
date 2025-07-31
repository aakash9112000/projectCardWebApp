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
            CI=false npm run build
            ls -l build
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
                echo "Copying build files to EC2..."
                scp -o StrictHostKeyChecking=no -r build/* ubuntu@52.66.186.126:/var/www/react-app/
                echo "Deployment complete!"
            '''
        }
    }
}



    }
}
