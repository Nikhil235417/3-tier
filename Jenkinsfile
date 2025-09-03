pipeline {
    agent any

    environment {
        DOCKERHUB_USER = '86312'
        DOCKERHUB_PASS = credentials('dockerhub-creds')  // Jenkins credential ID
        AWS_REGION = 'your-aws-region'
        EKS_CLUSTER = 'three-tier-cluster'
    }

    stages {
        stage('Clone Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Nikhil235417/3-tier.git',
                    credentialsId: 'git-creds'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t 86312/frontend ./frontend'
                sh 'docker build -t 86312/backend ./backend'
                sh 'docker build -t 86312/database ./database'
            }
        }

        stage('Push Docker Images') {
             withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $DOCKER_USER/frontend
                        docker push $DOCKER_USER/backend
                        docker push $DOCKER_USER/database
                    '''
                }
        }

        stage('Deploy to EKS') {
            steps {
                // Configure kubectl for EKS cluster
                sh "aws eks --region $AWS_REGION update-kubeconfig --name $EKS_CLUSTER"

                // Apply Kubernetes manifests
                sh 'kubectl apply -f k8s/namespace.yaml'
                sh 'kubectl apply -f k8s/database.yaml'
                sh 'kubectl apply -f k8s/backend.yaml'
                sh 'kubectl apply -f k8s/frontend.yaml'
            }
        }
    }
}

