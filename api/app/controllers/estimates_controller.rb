class EstimatesController < ApplicationController
  def create
    pars = params.permit(:mode, :ninety, :task_id)
    Estimate.create(pars)
  end

  def update
    pars = params.permit(:mode, :ninenty)
    Estimate.find(params[:id]).update(pars)
  end

  def index
    Estimate.where(params[:task_id])
  end
end
