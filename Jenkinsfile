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
                    url: 'https://github.com/Nikhil235417/3tier.git',
                    credentialsId: 'git-creds'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/frontend ./frontend'
                sh 'docker build -t $DOCKERHUB_USER/backend ./backend'
                sh 'docker build -t $DOCKERHUB_USER/database ./database'
            }
        }

        stage('Push Docker Images') {
            steps {
                sh "echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin"
                sh 'docker push $DOCKERHUB_USER/frontend'
                sh 'docker push $DOCKERHUB_USER/backend'
                sh 'docker push $DOCKERHUB_USER/database'
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

