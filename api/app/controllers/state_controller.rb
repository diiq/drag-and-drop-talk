class StateController < ApplicationController
  respond_to :json

  def set
    respond_with State.first_or_create(name: params[:name], task_id: params[:task_id])
  end

  def get
    respond_with State.first
  end

  def delete
    state = State.first
    state.task.estimates.destroy_all
    state.task.actions.destroy_all
    respond_with state
  end
end
